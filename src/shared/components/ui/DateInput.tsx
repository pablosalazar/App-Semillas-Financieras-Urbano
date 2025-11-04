import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";
import "react-day-picker/style.css";

export interface DateInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  clearable?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | readonly string[];
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      label,
      placeholder = "Selecciona una fecha",
      error,
      helperText,
      clearable = false,
      disabled = false,
      required = false,
      minDate,
      maxDate,
      onChange,
      onBlur,
      name,
      value,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const datePickerId =
      id ||
      (label
        ? `datepicker-${label.toLowerCase().replace(/\s+/g, "-")}`
        : `datepicker-${Math.random().toString(36).substr(2, 9)}`);

    const hiddenInputRef = useRef<HTMLInputElement | null>(null);
    const [internalDate, setInternalDate] = useState<Date | null>(null);

    // Combine refs
    useEffect(() => {
      if (typeof ref === "function") {
        ref(hiddenInputRef.current);
      } else if (ref) {
        ref.current = hiddenInputRef.current;
      }
    }, [ref]);

    // Sync hidden input value (from react-hook-form) to DatePicker UI
    const syncValueFromInput = useCallback(() => {
      if (hiddenInputRef.current) {
        const inputValue = hiddenInputRef.current.value;
        if (inputValue) {
          try {
            const date = new Date(inputValue);
            if (!isNaN(date.getTime())) {
              setInternalDate(date);
              return;
            }
          } catch {
            // Invalid date, fall through
          }
        }
        setInternalDate(null);
      }
    }, []);

    // Initial sync on mount and when ref is attached
    useEffect(() => {
      // Small delay to ensure ref is attached by react-hook-form
      const timer = setTimeout(() => {
        syncValueFromInput();
      }, 0);

      // Listen to input changes (for programmatic updates from react-hook-form)
      const input = hiddenInputRef.current;
      if (input) {
        const handleInputChange = () => {
          syncValueFromInput();
        };
        input.addEventListener("input", handleInputChange);
        return () => {
          clearTimeout(timer);
          input.removeEventListener("input", handleInputChange);
        };
      }

      return () => {
        clearTimeout(timer);
      };
    }, [syncValueFromInput]);

    // Sync when value prop changes (if provided - for controlled mode)
    useEffect(() => {
      if (value !== undefined && hiddenInputRef.current) {
        syncValueFromInput();
      }
    }, [value, syncValueFromInput]);

    const handleDateSelect = (date: Date | undefined) => {
      const newDate = date || null;
      setInternalDate(newDate);

      // Update hidden input and trigger onChange
      if (hiddenInputRef.current) {
        const dateValue = newDate ? newDate.toISOString() : "";
        hiddenInputRef.current.value = dateValue;

        if (onChange) {
          const syntheticEvent = {
            target: {
              value: dateValue,
              name: name || "",
            },
            currentTarget: hiddenInputRef.current,
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = "";
        if (onChange) {
          const syntheticEvent = {
            target: {
              value: "",
              name: name || "",
            },
            currentTarget: hiddenInputRef.current,
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
      setInternalDate(null);
    };

    return (
      <div className={clsx("w-full", className)}>
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
        {label && (
          <label
            htmlFor={datePickerId}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <Popover className="relative">
          <div className="relative">
            <PopoverButton
              id={datePickerId}
              className={clsx(
                "mt-1 block w-full rounded-md border px-3 py-2 pl-3 pr-20 text-base text-left",
                "focus:outline-none focus:ring-1",
                "disabled:cursor-not-allowed disabled:opacity-50",
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
                !internalDate && "text-gray-400"
              )}
              disabled={disabled}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={
                error
                  ? `${datePickerId}-error`
                  : helperText
                    ? `${datePickerId}-helper`
                    : undefined
              }
            >
              {internalDate
                ? format(internalDate, "PPP", { locale: es })
                : placeholder}
            </PopoverButton>
            <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
              {clearable && internalDate && !disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center px-2 hover:text-gray-700 touch-manipulation pointer-events-auto"
                  aria-label="Limpiar fecha"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              )}

              <div className="flex items-center px-2 pointer-events-auto">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <PopoverPanel
            anchor="bottom start"
            transition
            className="mt-1 border border-gray-200 bg-white rounded-md shadow-lg z-50"
          >
            {({ close }) => (
              <div className="p-3">
                <DayPicker
                  selected={internalDate ?? undefined}
                  defaultMonth={internalDate ?? undefined}
                  onSelect={(date) => {
                    handleDateSelect(date);
                    close();
                  }}
                  animate
                  captionLayout="dropdown"
                  hideWeekdays
                  mode="single"
                  navLayout="after"
                  showOutsideDays
                  className="rdp-custom"
                  locale={es}
                  startMonth={minDate}
                  endMonth={maxDate}
                />
              </div>
            )}
          </PopoverPanel>
        </Popover>
        {error && (
          <p id={`${datePickerId}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${datePickerId}-helper`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

DateInput.displayName = "DateInput";
