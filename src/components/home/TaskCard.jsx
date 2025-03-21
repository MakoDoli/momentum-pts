"use client";
import { slimFont } from "@/app/fonts/fontWeigtht";
//import { bColor } from "@/data/constants";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import Link from "next/link";
const bColor = {
  notStarted: {
    primary: "bg-primary-yellow",
    secondary: "bg-secondary-yellow",
    borderPrimary: "border-primary-yellow",
    borderSecondary: "border-secondary-yellow",
  },
  inProgress: {
    primary: "bg-primary-orange",
    secondary: "bg-secondary-orange",
    borderPrimary: "border-primary-orange",
    borderSecondary: "border-secondary-orange",
  },
  forTesting: {
    primary: "bg-primary-pink",
    secondary: "bg-secondary-pink",
    borderPrimary: "border-primary-pink",
    borderSecondary: "border-secondary-pink",
  },
  completed: {
    primary: "bg-primary-blue",
    secondary: "bg-secondary-blue",
    borderPrimary: "border-primary-blue",
    borderSecondary: "border-secondary-blue",
  },
};

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

  const num = Math.floor(Math.random() * 4 + 1);
  const bgColor =
    num === 1
      ? "bg-secondary-pink"
      : num === 2
      ? "bg-secondary-orange"
      : num === 3
      ? "bg-secondary-yellow"
      : "bg-secondary-blue";
  const depNameSplit = department.name.split(" ");
  const departmentName =
    depNameSplit[1][0] === "რ"
      ? department.name.substring(0, 14) + "."
      : depNameSplit[0][depNameSplit[0].length - 1] !== "ს"
      ? depNameSplit[0] + "ს"
      : depNameSplit[0];
  const priorityColor =
    priority.id === 3
      ? "text-primary-red border-primary-red"
      : priority.id === 1
      ? "text-primary-green border-primary-green"
      : "text-primary-yellowish border-primary-yellowish";

  const formattedDate = format(new Date(due_date), "d MMM, yyyy", {
    locale: ka,
  });

  return (
    <Link
      href={`/${task.id}/task-details`}
      className={`w-[381px] h-[217px] rounded-[15px] p-5 border ${bColor[statusName]?.borderPrimary}`}
    >
      <div className="flex justify-between h-6 items-center mb-[28px]">
        <div className="flex gap-[10px] items-center">
          <div
            className={`flex justify-center border ${priorityColor} rounded-[5px] gap-1 w-[86px] h-6 items-center`}
          >
            <Image src={priority.icon} alt="priority" width={16} height={18} />
            <p className={`${priorityColor} text-[12px]`}>{priority.name}</p>
          </div>
          <div
            className={`${slimFont.className} text-white px-[18px] py-[5px] text-[12px] rounded-[15px] ${bgColor}`}
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
      <p className="text-[15px] text-primary-headlines mb-3">
        {name && name?.length < 35
          ? name
          : name && name?.length >= 35
          ? name?.substring(0, 35) + "..."
          : ""}
      </p>
      <p
        className={`${slimFont.className} h-[34px] text-sm text-secondary-headlines mb-[28px]`}
      >
        {description && description?.length < 75
          ? description
          : description && description?.length >= 75
          ? description?.substring(0, 75) + "..."
          : ""}
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
            src="/icons/comment.svg"
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
