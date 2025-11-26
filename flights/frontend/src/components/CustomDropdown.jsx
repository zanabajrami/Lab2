import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";

const CustomDropdown = ({ options, selected, setSelected, placeholder }) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative w-40">
        <Listbox.Button className="relative w-full cursor-pointer bg-white border border-gray-300 rounded-lg py-2 px-3 text-left shadow-sm flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500">
          <span className="truncate">{selected || placeholder}</span>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <Listbox.Option
                key={option}
                value={option}
                className={({ active, selected }) =>
                  `cursor-pointer select-none relative py-2 pl-3 pr-8 ${active ? "bg-blue-100 text-blue-900" : "text-gray-700"
                  } ${selected ? "font-semibold" : ""}`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? "font-semibold" : ""}`}>
                      {option}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                        <Check className="w-5 h-5" />
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default CustomDropdown;