// src/shared/components/ui/Select.tsx
import { useState, useRef } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { Check, ChevronDown, X } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value?: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  error?: string;
  clearable?: boolean;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
  error,
  clearable = false,
}: SelectProps) => {
  const [query, setQuery] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((option) => option.value === value);

  const filteredOptions =
    query === ""
      ? options
      : options.filter((option) =>
          option.label.toLowerCase().includes(query.toLowerCase())
        );

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    setQuery("");
  };

  const handleInputClick = () => {
    buttonRef.current?.click();
  };

  return (
    <div className="w-full">
      <Combobox value={value} onChange={onChange} onClose={() => setQuery("")}>
        {() => (
          <div className="relative">
            <div className="relative">
              <ComboboxInput
                className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-20 text-base focus:border-blue-500 focus:outline-none  focus:ring-blue-500 cursor-pointer"
                displayValue={() => selected?.label || ""}
                onChange={(event) => setQuery(event.target.value)}
                onClick={handleInputClick}
                placeholder={placeholder}
              />

              <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none">
                {clearable && value && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex items-center px-2 hover:text-gray-700 touch-manipulation pointer-events-auto"
                    aria-label="Limpiar selección"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}

                <ComboboxButton
                  ref={buttonRef}
                  className="flex items-center px-2 touch-manipulation pointer-events-auto"
                >
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </ComboboxButton>
              </div>
            </div>

            <ComboboxOptions
              anchor="bottom start"
              className="w-(--input-width) mt-1 border border-gray-200 bg-white rounded-md shadow-lg empty:invisible max-h-60 overflow-auto py-1 z-50"
            >
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No hay opciones
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <ComboboxOption
                    key={option.value}
                    value={option.value}
                    className="group relative cursor-pointer select-none py-3 pl-10 pr-4 text-base data-focus:bg-blue-600 data-focus:text-white touch-manipulation"
                  >
                    <span className="block truncate group-data-selected:font-medium">
                      {option.label}
                    </span>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600 group-data-focus:text-white invisible group-data-selected:visible">
                      <Check className="h-5 w-5" />
                    </span>
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </div>
        )}
      </Combobox>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
