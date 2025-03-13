/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useEmployees } from "@/hooks/useEmployees";
import { useCreateNewTask } from "@/hooks/useCreateNewTask";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import { slimFont, thinFont } from "@/app/fonts/fontWeigtht";
import MiniSpinner from "@/components/ui/MiniSpinner";
import AddNewEmployee from "./AddNewEmployee";

export default function CreateNewTask({ departments, priorities, statuses }) {
  const storedData = JSON.parse(localStorage.getItem("TaskData"));
  const {
    control,
    register,
    handleSubmit,
    formState,
    watch,
    reset,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      description: "",
      status_id: storedData?.status_id || 0,
    },
  });
  const { createTask, isPending } = useCreateNewTask();
  const { errors, isSubmitting } = formState;
  const { employees } = useEmployees();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [employeeID, setEmployeeID] = useState("");
  const [employeeName, setEmployeeName] = useState("თანამშრომლების სია");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showEmployeeError, setShowEmployeeError] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);
  const [isInitialState, setIsInitialState] = useState(true);
  const [employeesList, setEmployeesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    setEmployeesList(employees);
  }, [employees]);

  const changedDepartment = watch("department_id");
  useEffect(() => {
    if (changedDepartment === undefined) {
      const storedEmployeeID = JSON.parse(localStorage.getItem("employeeID"));
      const storedEmployeeName = JSON.parse(
        localStorage.getItem("employeeName")
      );
      const storedAvatarUrl = JSON.parse(localStorage.getItem("avatarUrl"));

      if (storedEmployeeID) setEmployeeID(storedEmployeeID);
      if (storedEmployeeName) setEmployeeName(storedEmployeeName);
      if (storedAvatarUrl) setAvatarUrl(storedAvatarUrl);
    }
    setTimeout(() => setIsRestoring(false), 5000);
  }, [changedDepartment]);

  useEffect(() => {
    //const storedData = JSON.parse(localStorage.getItem("TaskData"));

    if (storedData) {
      setFilteredEmployees(
        employeesList?.filter(
          (emp) => emp.department.id === parseInt(storedData.department_id)
        )
      );
    }
    if (!isRestoring && changedDepartment !== undefined) {
      setAvatarUrl("");
      setEmployeeName("თანამშრომლების სია");
    }

    if (!storedData && changedDepartment) {
      setFilteredEmployees(
        employeesList?.filter(
          (emp) => emp.department.id === parseInt(changedDepartment)
        )
      );
      setEmployeeName("თანამშრომლების სია");
      setAvatarUrl("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedDepartment, reset, employeesList]);

  useEffect(() => {
    const savedData = localStorage.getItem("TaskData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      reset(parsedData);
    }
  }, [reset, setValue, trigger]);
  // Save the form data to local storage whenever a field changes
  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("TaskData", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen) return;
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
  }, [isModalOpen]);

  const submitFunction = (data) => {
    setIsInitialState(false);
    if (employeeName === "თანამშრომლების სია") {
      setShowEmployeeError(true);
      return;
    }
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("department_id", data.department_id);
    formData.append("employee_id", Number(employeeID));
    formData.append("description", data.description);
    console.log(formData);

    // createTask(formData, {
    //   onSuccess: () => {
    //     queryClient.invalidateQueries({
    //       queryKey: ["tasks"],
    //     });
    //     localStorage.removeItem("TaskData");
    //     localStorage.removeItem("TaskImage");
    //     localStorage.removeItem("TaskImageName");
    //     router.push("/");
    //   },
    // });
  };

  return (
    <div className="flex flex-col  relative  mt-[30px] bg-secondary-form">
      <form
        className="flex flex-col ml-[55px] mt-[71px] "
        onSubmit={handleSubmit(submitFunction)}
      >
        <div className="mb-[80px]">
          <div className="flex gap-[161px] mt-[22px]">
            <div className="flex flex-col gap-[49px]">
              <div className="flex flex-col gap-1 w-[550px] h-[64px]">
                <label
                  htmlFor="name"
                  className={`${slimFont.className} text-[16px] text-secondary-headlines`}
                >
                  სათაური*
                </label>

                <input
                  className={`outline-none border ${
                    errors.name ? "border-red-500" : "border-gray-400 "
                  } rounded-[5px] p-3 ${
                    thinFont.className
                  } text-primary-headlines font-thin h-[45px]`}
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "მინიმუმ ორი სიმბოლო",
                    minLength: {
                      value: 2,
                      message: "მინიმუმ ორი სიმბოლო",
                    },
                  })}
                />
                {errors.name && (
                  <p
                    className={`${slimFont.className} text-red-500 text-xs flex items-center gap-2`}
                  >
                    <span>
                      <Image
                        src="/icons/red-check.png"
                        width={10}
                        height={8}
                        alt="check"
                      />
                    </span>
                    {errors.name?.message}
                  </p>
                )}
                {!errors.name && (
                  <p
                    className={`${
                      slimFont.className
                    } text-xs flex items-center ${
                      isInitialState ? "text-black" : "text-green-600"
                    } gap-2`}
                  >
                    <span>
                      <Image
                        src={
                          isInitialState
                            ? "/icons/check.png"
                            : "/icons/green-check.png"
                        }
                        width={10}
                        height={8}
                        alt="check"
                      />
                    </span>
                    მინიმუმ ორი სიმბოლო
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[49px]">
              <div>
                <div className="flex relative flex-col gap-1 w-[550px] h-[64px]">
                  <label
                    htmlFor="department_id"
                    className={`${slimFont.className} text-[16px] text-secondary-headlines`}
                  >
                    დეპარტამენტი*{" "}
                  </label>
                  <Controller
                    name="department_id"
                    control={control}
                    rules={{ required: "აირჩიეთ დეპარტამენტი" }}
                    render={({ field }) => (
                      <>
                        <select
                          {...field}
                          className={`${
                            slimFont.className
                          } outline-none appearance-none border border-1  ${
                            errors.department_id
                              ? "border-red-500"
                              : "border-gray-400"
                          } rounded-[5px] p-3 relative  text-[14px] h-[45px] `}
                          id="department_id"
                        >
                          <option value=""></option>
                          {departments?.map((department) => (
                            <option
                              key={department.id}
                              className={`${slimFont.className} `}
                              value={department.id}
                            >
                              {department.name}
                            </option>
                          ))}
                        </select>
                        <span className="absolute right-3 top-2/3 transform pointer-events-none ">
                          <FaAngleDown className="w-[14px] h-[14px]"></FaAngleDown>
                        </span>
                      </>
                    )}
                  />
                  {errors.department_id && (
                    <p
                      className={`${slimFont.className} text-red-500 text-xs flex items-center gap-2`}
                    >
                      <span>
                        <Image
                          src="/icons/red-check.png"
                          width={10}
                          height={8}
                          alt="check"
                        />
                      </span>
                      {errors.department_id?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-[161px] mt-[49px]">
            <div className="flex flex-col gap-[49px]">
              <div className="flex flex-col gap-1 w-[550px]">
                <label
                  htmlFor=""
                  className={`${slimFont.className} text-[16px] text-secondary-headlines`}
                >
                  აღწერა*
                </label>

                <textarea
                  className={`${
                    thinFont.className
                  } text-sm outline-none border border-1  ${
                    errors.description ? "border-red-500" : "border-gray-400"
                  } rounded-[5px] p-3 h-[135px]`}
                  id="description"
                  {...register("description", {
                    validate: (value) =>
                      value.split(" ").length >= 6 || "მინიმუმ ხუთი სიტყვა",
                  })}
                />
                {errors.description && (
                  <p
                    className={`${slimFont.className} text-red-500 text-xs flex items-center gap-2`}
                  >
                    <span>
                      <Image
                        src="/icons/red-check.png"
                        width={10}
                        height={8}
                        alt="check"
                      />
                    </span>
                    {errors.description?.message}
                  </p>
                )}
                {!errors.description && (
                  <p
                    className={`${slimFont.className} ${
                      isInitialState ? "text-black" : "text-green-600"
                    } text-xs flex items-center gap-2`}
                  >
                    <span>
                      <Image
                        src={
                          isInitialState
                            ? "/icons/check.png"
                            : "/icons/green-check.png"
                        }
                        width={10}
                        height={8}
                        alt="check"
                      />
                    </span>
                    მინიმუმ ხუთი სიტყვა
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col ">
              {changedDepartment && changedDepartment !== "" && (
                <div className="flex flex-col gap-1 w-[550px] h-[64px] ">
                  <label
                    className={`${slimFont.className} text-[16px] text-secondary-headlines`}
                    htmlFor="employee_id"
                  >
                    პასუხისმგებელი თანამშრომელი
                  </label>

                  <div
                    className={`${slimFont.className} relative text-[14px] `}
                  >
                    <div
                      ref={buttonRef}
                      onClick={() => setIsSelectOpen((prev) => !prev)}
                      className={`${
                        slimFont.className
                      } text-[14px] w-[550px]  h-[45px] border ${
                        showEmployeeError ? "border-red-500" : "border-gray-400"
                      } ${
                        isSelectOpen
                          ? "border-b-0 rounded-t-[5px]"
                          : "rounded-[5px]"
                      }  flex items-center px-3 cursor-pointer justify-between relative`}
                    >
                      <div className="flex gap-2 items-center">
                        {avatarUrl && (
                          <Image
                            src={avatarUrl}
                            width={28}
                            height={28}
                            alt="employee avatar"
                            className="rounded-full"
                          />
                        )}
                        <p
                          className={`${thinFont.className} text-primary-headlines`}
                        >
                          {employeeName}
                        </p>
                      </div>

                      {isSelectOpen ? <FaAngleUp /> : <FaAngleDown />}
                    </div>
                    {isSelectOpen && (
                      <div
                        className="w-[550px] border overflow-y-auto overflow-x-hidden h-[168px] absolute  border-gray-400 rounded-b-lg"
                        ref={contentRef}
                      >
                        <AddNewEmployee
                          setModal={() => setIsModalOpen((prev) => !prev)}
                        />
                        {filteredEmployees?.reverse()?.map((emp) => (
                          <div
                            key={emp.id}
                            className={`flex  px-3 gap-2 h-[42px]   hover:bg-gray-100 items-center`}
                            onClick={() => {
                              setIsSelectOpen(false);
                              setEmployeeID(emp.id);
                              setEmployeeName(emp.name + " " + emp.surname);
                              setAvatarUrl(emp.avatar);
                              localStorage.setItem(
                                "employeeID",
                                JSON.stringify(emp.id)
                              );
                              localStorage.setItem(
                                "employeeName",
                                JSON.stringify(emp.name + " " + emp.surname)
                              );
                              localStorage.setItem(
                                "avatarUrl",
                                JSON.stringify(emp.avatar)
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
                            <p>{emp.name + " " + emp.surname}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-8 mt-[61px] ">
            <div className="flex relative flex-col gap-1 w-[259px] h-[64px]">
              <label
                htmlFor="priority_id"
                className={`${slimFont.className} text-[16px] text-secondary-headlines`}
              >
                პრიორიტეტი*{" "}
              </label>
              <Controller
                name="priority_id"
                control={control}
                rules={{ required: "აირჩიეთ პრიორიტეტი" }}
                render={({ field }) => (
                  <>
                    <select
                      {...field}
                      className={`${
                        slimFont.className
                      } outline-none appearance-none border border-1  ${
                        errors.priority_id
                          ? "border-red-500"
                          : "border-gray-400"
                      } rounded-[5px] p-3 relative  text-[14px] h-[45px] `}
                      value={field.value}
                      id="priority_id"
                    >
                      <option value=""></option>
                      {priorities?.map((pr) => (
                        <div key={pr.id} className="flex rounded-[5px]">
                          <option
                            key={pr.id}
                            className={`${slimFont.className} `}
                            value={pr.id}
                          >
                            {pr.name}
                          </option>
                        </div>
                      ))}
                    </select>
                    <span className="absolute right-3 top-2/3 transform pointer-events-none ">
                      <FaAngleDown className="w-[14px] h-[14px]"></FaAngleDown>
                    </span>
                  </>
                )}
              />
              {errors.priority_id && (
                <p
                  className={`${slimFont.className} text-red-500 text-xs flex items-center gap-2`}
                >
                  <span>
                    <Image
                      src="/icons/red-check.png"
                      width={10}
                      height={8}
                      alt="check"
                    />
                  </span>
                  {errors.priority_id?.message}
                </p>
              )}
            </div>

            <div className="flex relative flex-col gap-1 w-[259px] h-[64px]">
              <label
                htmlFor="status_id"
                className={`${slimFont.className} text-[16px] text-secondary-headlines`}
              >
                სტატუსი*{" "}
              </label>
              <Controller
                name="status_id"
                control={control}
                rules={{ required: "აირჩიეთ სტატუსი" }}
                render={({ field }) => (
                  <>
                    <select
                      {...field}
                      className={`${
                        slimFont.className
                      } outline-none appearance-none border border-1  ${
                        errors.status_id ? "border-red-500" : "border-gray-400"
                      } rounded-[5px] p-3 relative  text-[14px] h-[45px] `}
                      value={field.value ?? 0}
                      id="department_id"
                    >
                      {statuses?.map((status) => (
                        <option
                          key={status.id}
                          className={`${slimFont.className} `}
                          value={status.id}
                        >
                          {status.name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-3 top-2/3 transform pointer-events-none ">
                      <FaAngleDown className="w-[14px] h-[14px]"></FaAngleDown>
                    </span>
                  </>
                )}
              />
              {errors.status_id && (
                <p
                  className={`${slimFont.className} text-red-500 text-xs flex items-center gap-2`}
                >
                  <span>
                    <Image
                      src="/icons/red-check.png"
                      width={10}
                      height={8}
                      alt="check"
                    />
                  </span>
                  {errors.status_id?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-[31px] mb-[87px]  h-[47px] justify-end w-full mt-[147px]">
          <button
            type="button"
            className="border p-3 text-[16px] rounded-[5px]   hover:text-white"
            onClick={() => {
              localStorage.removeItem("TaskData");
              localStorage.removeItem("employeeName");

              router.push("/");
            }}
          >
            გაუქმება
          </button>

          <button
            className=" p-3 w-[187px] h-[47px] text-[16px] text-white bg-primary-violet hover:bg-secondary-violet hover-smooth rounded-[5px] "
            disabled={isSubmitting}
            onClick={() => setIsInitialState(false)}
          >
            {isPending ? <MiniSpinner /> : "დავალების შექმნა"}
          </button>
        </div>
      </form>
    </div>
  );
}
