import {
  boldFont,
  interFont,
  slimFont,
  thinFont,
} from "@/app/fonts/fontWeigtht";
import Image from "next/image";
import React from "react";
import StatusSelect from "./StatusSelect";
import { getStatuses } from "@/service/data-service";
import { formatDate } from "@/lib/helper";
import Comments from "./Comments";

export default async function TaskDetails({ task }) {
  const statuses = await getStatuses();

  const {
    name,
    priority,
    employee,
    description,
    department,
    due_date,
    status,
  } = task;
  const date = formatDate(due_date);
  const num = Math.floor(Math.random() * 4 + 1);
  const bgColor =
    num === 1
      ? "bg-secondary-pink"
      : num === 2
      ? "bg-secondary-orange"
      : num === 3
      ? "bg-secondary-yellow"
      : "bg-secondary-blue";
  const priorityColor =
    priority.id === 3
      ? "text-primary-red"
      : priority.id === 1
      ? "text-primary-green"
      : "text-primary-yellowish";
  return (
    <>
      <div className="flex gap-[18px] items-center mt-[152px] h-[29px]">
        <div className="flex justify-center gap-1 w-[86px] items-center">
          <Image src={priority.icon} alt="priority" width={16} height={18} />
          <p className={`${priorityColor} text-[16px]`}>{priority.name}</p>
        </div>
        <div
          className={`${slimFont.className} text-white px-[17px] py-[5px] text-[16px] rounded-[15px] ${bgColor}`}
        >
          {department.name}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="  mt-3">
          <div>
            <h1
              className={`${interFont.className} font-semibold text-[34px] text-primary-headlines`}
            >
              {name}
            </h1>
            <p
              className={`w-[715px] h-[108px] ${slimFont.className} text-[18px] mt-[26px] `}
            >
              {description}
            </p>
          </div>

          <div className="w-[293px] h-[277px] mt-[63px]">
            <h2 className="text-[24px] text-primary-headlines">
              დავალების დეტალები
            </h2>
            <div className="flex justify-between items-end mt-4 w-[493px]">
              <div className="flex gap-[6px] h-6">
                <Image
                  src="/icons/pie-chart.svg"
                  alt="pie-icon"
                  width={24}
                  height={24}
                />
                <p
                  className={`${slimFont.className} text-[16px] text-secondary-gray`}
                >
                  სტატუსი
                </p>
              </div>
              <StatusSelect
                statuses={statuses}
                status={status.name}
                taskId={task.id}
              />
            </div>
            <div className="flex items-center justify-between mt-[31px] h-[70px] w-[493px]">
              <div className="flex gap-[6px] h-6">
                <Image
                  src="/icons/empl.svg"
                  alt="pie-icon"
                  width={24}
                  height={24}
                />
                <p
                  className={`${slimFont.className} text-[16px] text-secondary-gray`}
                >
                  თანამშრომელი
                </p>
              </div>
              <div className="flex gap-[6px] w-[259px] h-[70px]">
                <div className="flex justify-center items-center">
                  <Image
                    src={employee.avatar}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </div>
                <div className="mt-2">
                  <p
                    className={`${thinFont.className} text-secondary-gray text-[11px]`}
                  >
                    {department.name}
                  </p>
                  <p
                    className={`${slimFont.className} text-sm, text-secondary-headlines`}
                  >
                    {employee.name} {employee.surname}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-[70px] items-end mt-4 w-[493px]">
              <div className="flex gap-[6px] h-6">
                <Image
                  src="/icons/calendar.svg"
                  alt="pie-icon"
                  width={24}
                  height={24}
                />
                <p
                  className={`${slimFont.className} text-[16px] text-secondary-gray`}
                >
                  დავალების ვადა
                </p>
              </div>
              <p
                className={`${slimFont.className} text-sm text-secondary-blackish`}
              >
                {date}
              </p>
            </div>
          </div>
        </div>
        <Comments taskId={task.id} />
      </div>
    </>
  );
}
