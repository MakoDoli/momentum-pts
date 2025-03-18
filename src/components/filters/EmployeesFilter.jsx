"use client";
import { slimFont } from "@/app/fonts/fontWeigtht";

import { FilterContext } from "@/providers/FilterProvider";

import Image from "next/image";
import { useState, forwardRef, useContext } from "react";

const EmployeesFilter = forwardRef(({ open, setOpen, data }, ref) => {
  const [selectedOption, setSelectedOption] = useState("");
  const { filters, setFilters } = useContext(FilterContext);

  const handleFilter = () => {
    const updatedFilters = [...filters].filter(
      (filter) => filter.type !== "employee"
    );
    console.log("filters in employee" + updatedFilters);

    updatedFilters.push({ type: "employee", value: selectedOption });

    setFilters(updatedFilters);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div ref={ref}>
      <div className="absolute mt-4 bg-white border border-primary-violet w-[688px] h-[274px] -left-2 flex flex-col overflow-y-auto rounded-[10px] pt-10 pb-5 px-[30px] z-30">
        <div
          className={`${slimFont.className} text-secondary-headlines text-sm mb-8 h-[154px]  overflow-y-auto`}
        >
          {data?.map((item) => (
            <label key={item.id} className="flex items-center space-x-2 mb-6">
              <input
                type="checkbox"
                checked={selectedOption.includes(
                  `${item.name} ${item.surname}`
                )}
                onChange={() =>
                  setSelectedOption(`${item.name} ${item.surname}`)
                }
                className="peer hidden t"
              />
              <div
                className={`w-4 h-4 border-2 border-primary-violet rounded-sm flex items-center justify-center  `}
              >
                {selectedOption.includes(`${item.name} ${item.surname}`) && (
                  <Image
                    src="/icons/violet-check.svg"
                    alt="checked"
                    width={10}
                    height={8}
                  />
                )}
              </div>
              <Image
                src={item.avatar}
                alt="avatar"
                width={28}
                height={28}
                className="rounded-full"
              />
              <span>{item.name}</span>
              <span>{item.surname}</span>
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

EmployeesFilter.displayName = "EmployeesFilter";

export default EmployeesFilter;
