"use client";
import { slimFont, thinFont } from "@/app/fonts/fontWeigtht";
import { useUpdateStatus } from "@/hooks/useUpdateStatus";

import { useQueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function CustomSelect({ statuses, setStatus, status }) {
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
    <div className="flex flex-col gap-1 w-[259px]  ">
      <label
        className={`${slimFont.className} text-[16px]  ${
          isSelectOpen ? "text-primary-violet" : "text-secondary-headlines"
        }`}
        htmlFor="Priority_id"
      >
        სტატუსი*
      </label>
      <div className={`${slimFont.className} relative text-[14px] `}>
        <div
          ref={buttonRef}
          onClick={() => setIsSelectOpen((prev) => !prev)}
          className={`${
            slimFont.className
          } text-[14px] w-[259px]  h-[45px] border 
          } ${
            isSelectOpen
              ? " border-primary-violet border-b-0 rounded-t-[5px] "
              : "rounded-[5px] border-secondary-border"
          }  flex items-center px-3 cursor-pointer justify-between relative`}
        >
          <div className="flex gap-2 items-center">
            <p className={`${thinFont.className} text-primary-headlines`}>
              {status.name}
            </p>
          </div>

          {isSelectOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        {isSelectOpen && (
          <div
            className={`w-[259px] border overflow-y-auto overflow-x-hidden  absolute $ border-primary-violet rounded-b-lg border-t-0 bg-white`}
            ref={contentRef}
          >
            {statuses?.map((st) => (
              <div
                key={st.id}
                className={`flex  px-3 gap-2 h-[42px]   hover:bg-gray-100 items-center`}
                onClick={() => {
                  setIsSelectOpen(false);
                  setStatus({ name: st.name, id: st.id });
                  localStorage.setItem(
                    "status",
                    JSON.stringify({ name: st.name, id: st.id })
                  );
                }}
              >
                <p className={`${thinFont.className} text-primary-blackish`}>
                  {st.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
