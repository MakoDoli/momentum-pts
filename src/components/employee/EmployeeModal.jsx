"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

import CreateNewEmployee from "./CreateNewEmployee";
import { mediumFont, slimFont } from "@/app/fonts/fontWeigtht";

export default function EmployeeModal({ departments }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          className={`text-primary-headlines ${slimFont.className} w-[225px] h-full flex justify-center items-center  border border-primary-violet hover:border-secondary-violet rounded-[5px] hover-smooth  cursor-pointer`}
          onClick={() => setOpen(true)}
        >
          <p> თანამშრომლის შექმნა</p>
        </div>
      </DialogTrigger>
      {open && (
        <DialogContent className="flex max-h-[766px]  flex-col max-w-[913px] h-screen  items-center overflow-y-auto justify-center gap-8 ">
          <DialogHeader className="items-center">
            <DialogTitle
              className={`${mediumFont.className} text-[32px] font-medium`}
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
                departments={departments}
              />
            </section>
          </DialogDescription>
        </DialogContent>
      )}
    </Dialog>
  );
}
