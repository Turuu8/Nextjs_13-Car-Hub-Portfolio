"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types";
import { Combobox, Transition } from "@headlessui/react";

export const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {
  const [query, setQuery] = useState("");

  const filterManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) => item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="w-full relative">
          <Combobox.Button className="absolute top-[14px] left-4">
            <Image alt="Car logo" src="/car-logo.svg" className="object-contain" width={20} height={20} />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              static
            >
              {filterManufacturers.length === 0 && query !== "" ? (
                <Combobox.Option value={query} className="search-manufacturer__option">
                  Nothing found.
                </Combobox.Option>
              ) : (
                filterManufacturers.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) => `relative search-manufacturer__option ${active ? "bg-primary-blue text-white" : "text-gray-900"}`}
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{item}</span>
                        {selected ? (
                          <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"}`}></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};
