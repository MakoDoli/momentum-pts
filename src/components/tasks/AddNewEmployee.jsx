"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateNewEmployee from "../employee/CreateNewEmployee";
import { mediumFont, slimFont } from "@/app/fonts/fontWeigtht";

export default function AddNewEmployee({
  setIsModalOpen,
  isModalOpen,
  setIsSelectOpen,
  departments,
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
    setIsModalOpen(!isModalOpen);
  };
  return (
    <Dialog open={open} onOpenChange={() => handleClose()}>
      <DialogTrigger>
        <div
          className="flex  cursor-pointer  px-3 w-[550px] gap-2 h-[45px] items-center hover:bg-secondary-form"
          onClick={() => {
            setOpen(true);
          }}
        >
          <img src="/icons/add-emp.png" alt="plus"></img>
          <p
            className={`${slimFont.className} text-[16px] text-primary-violet`}
          >
            დაამატე თანამშრომელი
          </p>
        </div>
      </DialogTrigger>
      {open && (
        <DialogContent className="flex max-h-[766px]  flex-col max-w-[913px] h-screen px-[50px]  overflow-y-auto ">
          <DialogHeader className="items-center">
            <DialogTitle
              className={`${mediumFont.className} text-[32px] font-medium mb-[45px] mt-[117px]`}
            >
              თანამშრომლის დამატება
            </DialogTitle>
          </DialogHeader>
          <DialogDescription asChild>
            <section>
              <p id="agent-form-description" className="sr-only">
                create new employee
              </p>
              <CreateNewEmployee
                setOpen={() => setOpen(false)}
                setIsModalOpen={() => setIsModalOpen(false)}
                setIsSelectOpen={setIsSelectOpen}
                departments={departments}
              />
            </section>
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  );
}
