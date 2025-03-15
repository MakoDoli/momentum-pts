/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useEmployees } from "@/hooks/useEmployees";
import { useCreateNewTask } from "@/hooks/useCreateNewTask";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { FaAngleDown } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { slimFont, thinFont } from "@/app/fonts/fontWeigtht";
import MiniSpinner from "@/components/ui/MiniSpinner";

import EmployeeList from "./EmployeeList";
import PriorityList from "./PriorityList";
import { format } from "date-fns";

export default function CreateNewTask({ departments, priorities, statuses }) {
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
    },
  });
  const { createTask, isPending } = useCreateNewTask();
  const { errors, isSubmitting } = formState;
  const { employees } = useEmployees();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: "",
    name: "თანამშრომლების სია",
    avatar: "",
  });
  const [priority, setPriority] = useState({});
  const [showPriorityError, setShowPriorityError] = useState(false);
  const [showEmployeeError, setShowEmployeeError] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);
  const [isInitialState, setIsInitialState] = useState(true);
  const [employeesList, setEmployeesList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setEmployeesList(employees);
  }, [employees]);

  const changedDepartment = watch("department_id");
  useEffect(() => {
    const storedPriority = JSON.parse(localStorage.getItem("priority"));
    if (changedDepartment === undefined) {
      const storedEmployee = JSON.parse(localStorage.getItem("employee"));

      if (storedEmployee) setEmployee(storedEmployee);
      if (storedPriority) setPriority(storedPriority);
    }
    setTimeout(() => setIsRestoring(false), 5000);
  }, [changedDepartment]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("TaskData"));

    if (storedData) {
      setFilteredEmployees(
        employeesList?.filter(
          (emp) => emp.department.id === parseInt(storedData.department_id)
        )
      );
    }
    if (!isRestoring && changedDepartment !== undefined) {
      setEmployee({
        ...employee,
        id: "",
        name: "თანამშრომლების სია",
        avatar: "",
      });
      localStorage.removeItem("employee");
    }

    if (!storedData && changedDepartment) {
      setFilteredEmployees(
        employeesList?.filter(
          (emp) => emp.department.id === parseInt(changedDepartment)
        )
      );
      setEmployee({
        ...employee,
        id: "",
        name: "თანამშრომლების სია",
        avatar: "",
      });
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

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("TaskData", JSON.stringify(value));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const submitFunction = (data) => {
    // setIsInitialState(false);
    // if (employee.name === "თანამშრომლების სია") {
    //   setShowEmployeeError(true);
    //   return;
    // }
    // if (priority.name === "") {
    //   setShowPriorityError(true);
    //   return;
    // }
    // const formData = new FormData();

    // formData.append("name", data.name);
    // formData.append("department_id", data.department_id);
    // formData.append("description", data.description);
    // formData.append("employee_id", Number(employee.id));
    // formData.append("priority_id", Number(priority.id));
    // console.log(formData);
    setIsInitialState(false);

    // Validate Employee Selection
    if (employee.name === "თანამშრომლების სია") {
      setShowEmployeeError(true);
      return;
    }

    // Validate Priority Selection
    if (!priority?.id) {
      setShowPriorityError(true);
      return;
    }

    // Format due_date
    const formattedDate = data.due_date
      ? format(new Date(data.due_date), "yyyy-MM-dd")
      : null;

    // Construct JSON payload
    // const formattedData = {
    //   id: Math.floor(Math.random() * 9999) + 1,
    //   name: data.name,
    //   description: data.description,
    //   due_date: formattedDate,
    //   status: {
    //     id: Number(data.status_id),
    //     name:
    //       statuses.filter((status) => status.id === Number(data.status_id))[0]
    //         ?.name || "",
    //   },
    //   priority: {
    //     id: priority.id,
    //     name: priority.name,
    //     icon: priority.icon,
    //   },
    //   department: {
    //     id: Number(data.department_id),
    //     name:
    //       departments.filter((dep) => dep.id === Number(data.department_id))[0]
    //         ?.name || "",
    //   },
    //   employee: {
    //     id: employee.id,
    //     name: employee.name.split(" ")[0],
    //     surname: employee.name.split(" ")[1],
    //     avatar: employee.avatar,
    //     department_id: Number(data.department_id),
    //   },
    // };
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("employee_id", employee.id);
    formData.append("priority_id", priority.id);
    formData.append("status_id", data.status_id);
    formData.append("due_date", formattedDate);

    createTask(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
        localStorage.removeItem("TaskData");
        localStorage.removeItem("employee");
        localStorage.removeItem("priority");

        router.push("/");
      },
    });
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
                <EmployeeList
                  filteredEmployees={filteredEmployees}
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  showEmployeeError={showEmployeeError}
                  employee={employee}
                  setEmployee={setEmployee}
                  departments={departments}
                />
              )}
            </div>
          </div>
          <div className="flex gap=[161px] mt-[61px]">
            <div className="flex gap-8  ">
              <PriorityList
                priorities={priorities}
                priority={priority}
                setShowPriorityError={setShowPriorityError}
                showPriorityError={showPriorityError}
                setPriority={setPriority}
              />

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
                          errors.status_id
                            ? "border-red-500"
                            : "border-gray-400"
                        } rounded-[5px] p-3 relative  text-[14px] h-[45px] `}
                        value={field.value ?? 1}
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
                {/* {errors.status_id && (
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
              )} */}
              </div>
            </div>
            <div className="flex flex-col relative gap-1 w-[318px] ml-[161px] h-[64px]">
              <label
                htmlFor="date"
                className={`${slimFont.className} text-[16px] text-secondary-headlines`}
              >
                დედლაინი*
              </label>
              <img
                src="/icons/calendar.svg"
                alt="calendar"
                className="absolute top-11 left-4 z-10 "
              />
              <Controller
                control={control}
                name="due_date"
                rules={{ required: "აირჩიეთ თარიღი" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/YYYY"
                    calendarClassName="custom-calendar"
                    className={`outline-none border ${
                      errors.due_date ? "border-red-500" : "border-gray-400"
                    } rounded-[5px] pl-9 ${
                      thinFont.className
                    } text-primary-headlines custom-datepicker h-[45px] w-full`}
                  />
                )}
              />
              {errors.due_date && (
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
                  {errors.due_date?.message}
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
              localStorage.removeItem("employee");
              localStorage.removeItem("priority");
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
