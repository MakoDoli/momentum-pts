"use client";
import { slimFont } from "@/app/fonts/fontWeigtht";

import { FilterContext } from "@/providers/FilterProvider";

import Image from "next/image";
import { useState, forwardRef, useContext } from "react";

const PrioritiesFilter = forwardRef(({ open, setOpen, data }, ref) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { filters, setFilters } = useContext(FilterContext);

  const handleChange = (option) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.includes(option)
        ? prevSelected.filter((item) => item !== option)
        : [...prevSelected, option]
    );
  };

  const handleFilter = () => {
    const updatedFilters = [...filters];
    selectedOptions.forEach((option) => {
      const exists = updatedFilters.some(
        (filter) => filter.type === "priority" && filter.value === option
      );

      if (!exists) {
        updatedFilters.push({ type: "priority", value: option });
      }
    });
    setFilters(updatedFilters);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div ref={ref}>
      <div className="absolute mt-4 bg-white border border-primary-violet w-[688px] h-[274px] -left-2 flex flex-col overflow-y-auto rounded-[10px] pt-10 pb-5 px-[30px] z-30">
        <div
          className={`${slimFont.className} text-secondary-headlines text-sm  mb-8 h-[154px]  overflow-y-auto`}
        >
          {data?.map((item) => (
            <label key={item.id} className="flex items-center space-x-2 mb-6">
              <input
                type="checkbox"
                checked={selectedOptions.includes(item.name)}
                onChange={() => handleChange(item.name)}
                className="peer hidden"
              />
              <div
                className={`w-4 h-4 border border-primary-violet rounded-sm flex items-center justify-center  `}
              >
                {selectedOptions.includes(item.name) && (
                  <Image
                    src="/icons/violet-check.svg"
                    alt="checked"
                    width={10}
                    height={8}
                  />
                )}
              </div>
              <span>{item.name}</span>
            </label>
          ))}
        </div>
        <div
          className={`${slimFont.className} w-[155px] h-[35px] rounded-[20px] bg-primary-violet flex justify-center items-center cursor-pointer text-white text-[14px] self-end`}
          onClick={handleFilter}
        >
          არჩევა
        </div>
      </div>
    </div>
  );
});

PrioritiesFilter.displayName = "PrioritiesFilter";

export default PrioritiesFilter;
