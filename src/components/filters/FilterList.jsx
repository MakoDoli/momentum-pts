"use client";
import React from "react";
import { useFilters } from "../../providers/FilterProvider";

import Image from "next/image";
import { slimFont } from "@/app/fonts/fontWeigtht";

function FilterList() {
  const { filters, setFilters } = useFilters();

  const removeFilter = (filterToRemove) => {
    setFilters(filters.filter((filter) => filter !== filterToRemove));
  };

  return (
    <div
      className={` flex  gap-2 items-center z-20 absolute min-h-[29px] w-[1600px] ${
        filters.length <= 5 ? "flex-nowrap top-[70px]" : "top-[52px]  flex-wrap"
      }`}
    >
      {filters.map((filter, index) => (
        <div
          key={index}
          className={`${slimFont.className} rounded-full flex items-center gap-1  text-[14px] min-h-[29px]  text-secondary-headlines px-[10px]  border border-gray-300 `}
        >
          <p>{filter.value}</p>
          <Image
            src="/icons/clear.svg"
            alt="clear"
            width={14}
            height={14}
            className="cursor-pointer"
            onClick={() => removeFilter(filter)}
          />
        </div>
      ))}
      {filters.length > 0 && (
        <div
          className={`${slimFont.className} text-[14px] ml-4 cursor-pointer text-secondary-headlines`}
          onClick={() => setFilters([])}
        >
          <p>გასუფთავება</p>
        </div>
      )}
    </div>
  );
}

export default FilterList;
