import { slimFont } from "@/app/fonts/fontWeigtht";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import EmployeeModal from "../employee/EmployeeModal";
import { getDepartments } from "@/service/data-service";

export default async function Header() {
  const departments = await getDepartments();
  return (
    <header className="h-[100px] flex items-center justify-between sticky">
      <Link href="/">
        <Image
          src="/logos/logo-main.png"
          alt="main logo"
          width={210}
          height={38}
        />
      </Link>
      <div className="w-[533px] h-10 flex gap-10 text-[16px]">
        <EmployeeModal departments={departments} />
        <div
          className={`text-white ${slimFont.className} w-[268px] bg-primary-violet hover:bg-secondary-violet flex justify-center gap-1 items-center rounded-[5px] cursor-pointer hover-smooth`}
        >
          <Image src="/icons/add.png" width={20} height={20} alt="add-icon" />
          <p>შექმენი ახალი დავალება</p>
        </div>
      </div>
    </header>
  );
}
