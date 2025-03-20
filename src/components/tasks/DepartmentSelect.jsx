"use client";
import { slimFont, thinFont } from "@/app/fonts/fontWeigtht";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function DepartmentSelect({
  departments,
  setDepartment,
  department,
  showDepartmentError,
  setShowDepartmentError,
}) {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        contentRef.current &&
        !contentRef.current.contains(event.target)
      ) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1 w-[550px]  ">
      <label
        className={`${slimFont.className} text-[16px]  ${
          isSelectOpen ? "text-primary-violet" : "text-secondary-headlines"
        }`}
        htmlFor="department"
      >
        დეპარტამენტი*
      </label>
      <div className={`${slimFont.className} relative text-[14px] `}>
        <div
          id="department"
          ref={buttonRef}
          onClick={() => setIsSelectOpen((prev) => !prev)}
          className={`${
            slimFont.className
          } text-[14px] w-[550px]  h-[45px] border 
          } ${
            isSelectOpen
              ? " border-primary-violet border-b-0 rounded-t-[5px] "
              : !isSelectOpen && showDepartmentError
              ? "border-red-500 rounded-[5px]"
              : "rounded-[5px] border-secondary-border"
          }  flex items-center px-3 cursor-pointer justify-between relative`}
        >
          <div className="flex gap-2 items-center">
            <p className={`${thinFont.className} text-primary-headlines`}>
              {department ? department.name : ""}
            </p>
          </div>

          {isSelectOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        {isSelectOpen && (
          <div
            className={`w-[550px] border overflow-y-auto overflow-x-hidden  absolute $ border-primary-violet rounded-b-lg border-t-0 bg-white z-30`}
            ref={contentRef}
          >
            {departments?.map((dep) => (
              <div
                key={dep.id}
                className={`flex  px-3 gap-2 h-[42px]   hover:bg-gray-100 items-center`}
                onClick={() => {
                  setIsSelectOpen(false);
                  setDepartment({ name: dep.name, id: dep.id });
                  localStorage.setItem(
                    "department",
                    JSON.stringify({ name: dep.name, id: dep.id })
                  );
                  setShowDepartmentError(false);
                }}
              >
                <p className={`${thinFont.className} text-primary-blackish`}>
                  {dep.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
