import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// Assuming this component exists as in your original code
import { slimFont, thinFont } from "@/app/fonts/fontWeigtht";

export default function PriorityList({
  setPriority,
  showPriorityError,
  priority,
  isModalOpen,
  setIsModalOpen,
  priorities,
}) {
  const buttonRef = useRef(null);
  const contentRef = useRef(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  //   useEffect(() => {
  //     if (isModalOpen) return;
  //     const handleClickOutside = (event) => {
  //       if (
  //         buttonRef.current &&
  //         !buttonRef.current.contains(event.target) &&
  //         contentRef.current &&
  //         !contentRef.current.contains(event.target)
  //       ) {
  //         setIsSelectOpen(false);
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => document.removeEventListener("mousedown", handleClickOutside);
  //   }, []);

  return (
    <div className="flex flex-col gap-1 w-[259px] h-[64px] ">
      <label
        className={`${slimFont.className} text-[16px] text-secondary-headlines`}
        htmlFor="Priority_id"
      >
        პრიორიტეტი*
      </label>

      <div className={`${slimFont.className} relative text-[14px] `}>
        <div
          ref={buttonRef}
          onClick={() => setIsSelectOpen((prev) => !prev)}
          className={`${
            slimFont.className
          } text-[14px] w-[259px]  h-[45px] border ${
            showPriorityError ? "border-red-500" : "border-secondary-border"
          } ${
            isSelectOpen ? "border-b-0 rounded-t-[5px]" : "rounded-[5px]"
          }  flex items-center px-3 cursor-pointer justify-between relative`}
        >
          <div className="flex gap-2 items-center">
            {priority.icon && (
              <Image
                src={priority.icon}
                width={28}
                height={28}
                alt="Priority avatar"
                className="rounded-full"
              />
            )}
            <p className={`${thinFont.className} text-primary-blackish`}>
              {priority.name}
            </p>
          </div>

          {isSelectOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        {isSelectOpen && (
          <div
            className="w-[259px] border overflow-y-auto overflow-x-hidden  absolute  border-secondary-border rounded-b-lg"
            ref={contentRef}
          >
            {priorities?.reverse()?.map((pr) => (
              <div
                key={pr.id}
                className={`flex  px-3 gap-2 h-[42px]   hover:bg-gray-100 items-center`}
                onClick={() => {
                  setIsSelectOpen(false);
                  setPriority({ name: pr.name, icon: pr.icon, id: pr.id });
                  localStorage.setItem(
                    "priority",
                    JSON.stringify({ name: pr.name, icon: pr.icon, id: pr.id })
                  );
                }}
              >
                <Image
                  src={pr.icon}
                  width={28}
                  height={28}
                  alt="priority icon"
                  className="rounded-full"
                />
                <p className={`${thinFont.className} text-primary-blackish `}>
                  {pr.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
