import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import AddNewEmployee from "./AddNewEmployee"; // Assuming this component exists as in your original code
import { slimFont, thinFont } from "@/app/fonts/fontWeigtht";

export default function EmployeeList({
  filteredEmployees,
  setEmployeeID,
  setEmployeeName,
  setAvatarUrl,
  showEmployeeError,
  employeeName,
  avatarUrl,
  isModalOpen,
  setIsModalOpen,
  departments,
  employee,
  setEmployee,
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
    <div className="flex flex-col gap-1 w-[550px] h-[64px] ">
      <label
        className={`${slimFont.className} text-[16px] text-secondary-headlines`}
        htmlFor="employee_id"
      >
        პასუხისმგებელი თანამშრომელი
      </label>

      <div className={`${slimFont.className} relative text-[14px] `}>
        <div
          ref={buttonRef}
          onClick={() => setIsSelectOpen((prev) => !prev)}
          className={`${
            slimFont.className
          } text-[14px] w-[550px]  h-[45px] border ${
            showEmployeeError ? "border-red-500" : "border-secondary-border"
          } ${
            isSelectOpen ? "border-b-0 rounded-t-[5px]" : "rounded-[5px]"
          }  flex items-center px-3 cursor-pointer justify-between relative`}
        >
          <div className="flex gap-2 items-center">
            {employee.avatar && (
              <Image
                src={employee.avatar}
                width={28}
                height={28}
                alt="employee avatar"
                className="rounded-full"
              />
            )}
            <p
              className={`${thinFont.className} text-sm text-primary-blackish`}
            >
              {employee.name}
            </p>
          </div>

          {isSelectOpen ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        {isSelectOpen && (
          <div
            className="w-[550px] border overflow-y-auto overflow-x-hidden h-[168px] absolute  border-secondary-border rounded-b-lg"
            ref={contentRef}
          >
            <AddNewEmployee
              setIsModalOpen={() => setIsModalOpen((prev) => !prev)}
              departments={departments}
            />
            {filteredEmployees?.reverse()?.map((emp) => (
              <div
                key={emp.id}
                className={`flex  px-3 gap-2 h-[42px]   hover:bg-gray-100 items-center`}
                onClick={() => {
                  setIsSelectOpen(false);

                  setEmployee({
                    id: emp.id,
                    name: emp.name + " " + emp.surname,
                    avatar: emp.avatar,
                  });
                  localStorage.setItem(
                    "employee",
                    JSON.stringify({
                      id: emp.id,
                      name: emp.name + " " + emp.surname,
                      avatar: emp.avatar,
                    })
                  );
                }}
              >
                <Image
                  src={emp.avatar}
                  width={28}
                  height={28}
                  alt="employee avatar"
                  className="rounded-full"
                />
                <p className="text-primary-blackish">
                  {emp.name + " " + emp.surname}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
