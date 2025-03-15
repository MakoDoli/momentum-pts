"use client";
import { slimFont } from "@/app/fonts/fontWeigtht";
import { bgColor } from "@/data/constants";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import Link from "next/link";

export default function TaskCard({ task, statusName }) {
  const {
    name,
    priority,
    employee,
    description,
    department,
    due_date,
    total_comments,
  } = task;

  const depNameSplit = department.name.split(" ");
  const departmentName =
    depNameSplit[1][0] === "რ"
      ? department.name.substring(0, 14) + "."
      : depNameSplit[0][depNameSplit[0].length - 1] !== "ს"
      ? depNameSplit[0] + "ს"
      : depNameSplit[0];
  const priorityColor =
    priority.id === 3
      ? "text-primary-red"
      : priority.id === 1
      ? "text-primary-green"
      : "text-primary-yellowish";

  const formattedDate = format(new Date(due_date), "d MMM, yyyy", {
    locale: ka,
  });

  return (
    <Link
      href="/task-details"
      className={`w-[381px] h-[217px] rounded-[15px] p-5 border ${bgColor[statusName]?.borderPrimary}`}
    >
      <div className="flex justify-between h-6 items-center mb-[28px]">
        <div className="flex gap-[9px] items-center">
          <div className="flex justify-center gap-1 w-[86px] items-center">
            <Image src={priority.icon} alt="priority" width={16} height={18} />
            <p className={`${priorityColor} text-[12px]`}>{priority.name}</p>
          </div>
          <div
            className={`${slimFont.className} text-white px-[17px] py-[5px] rounded-[15px] ${bgColor[statusName]?.secondary}`}
          >
            {departmentName}
          </div>
        </div>
        <div
          className={`${slimFont.className} text-[12px] text-primary-headlines`}
        >
          {formattedDate}
        </div>
      </div>
      <p className="text-[15px] text-primary-headlines mb-3">{name}</p>
      <p
        className={`${slimFont.className} h-[34px] text-sm text-secondary-headlines mb-[28px]`}
      >
        {description}
      </p>
      <div className="flex justify-between items-center">
        <Image
          src={employee.avatar}
          className="rounded-full"
          width={31}
          height={31}
          alt="avatar"
        />
        <div className="flex gap-1 items-center">
          <Image
            src="/icons/comments.svg"
            alt="comments"
            width={22}
            height={22}
          />
          <div
            className={`${slimFont.className} text-sm text-primary-headlines`}
          >
            {total_comments}
          </div>
        </div>
      </div>
    </Link>
  );
}
