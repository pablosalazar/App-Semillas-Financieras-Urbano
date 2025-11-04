import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, X } from "lucide-react";
import { DayPicker } from "react-day-picker";
import clsx from "clsx";
import "react-day-picker/style.css";

interface DatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  placeholder?: string;
  error?: string;
  clearable?: boolean;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Selecciona una fecha",
  error,
  clearable = false,
  disabled = false,
  minDate,
  maxDate,
}: DatePickerProps) {
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <>
      <Popover className="relative">
        <div className="relative">
          <PopoverButton
            className={clsx(
              "block",
              "border-gray-300 px-3 focus:border-blue-500 focus:outline-none",
              "w-full rounded-md border py-2 pl-3 pr-20 text-base text-left",
              disabled && "cursor-not-allowed opacity-50",
              !value && "text-gray-400",
              error && "border-red-500"
            )}
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
