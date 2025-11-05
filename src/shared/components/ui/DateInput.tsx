import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";
import "react-day-picker/style.css";

export interface DateInputProps {
  value?: Date | null;
  label?: string;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  error?: string;
  clearable?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  required?: boolean;
}

export function DateInput({
  value,
  label,
  onChange,
  placeholder = "Selecciona una fecha",
  error,
  clearable = false,
  disabled = false,
  minDate,
  maxDate,
  required = false,
}: DateInputProps) {
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  const inputId = label
    ? `input-${label.toLowerCase().replace(/\s+/g, "-")}`
    : `input-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Popover className="relative">
        <div className="relative">
          <PopoverButton
            className={clsx(
              "mt-1 block w-full rounded-md border px-3 py-2 pl-3 pr-20 text-base text-left",
              "focus:outline-none focus:ring-1",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
              !value && "text-gray-400"
            )}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}

          >
            {value ? format(value, "PPP", { locale: es }) : placeholder}
          </PopoverButton>
          <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
            {clearable && value && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center px-2 hover:text-gray-700 touch-manipulation pointer-events-auto"
                aria-label="Limpiar fecha"
              >
                <X className="text-gray-400" />
              </button>
            )}

            <div className="flex items-center px-2 pointer-events-auto">
              <Calendar className="text-gray-400" />
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
                selected={value ?? undefined}
                defaultMonth={value ?? undefined}
                onSelect={(date) => {
                  onChange(date || null);
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
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </>
  );
}