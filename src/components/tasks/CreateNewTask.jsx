/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useEmployees } from "@/hooks/useEmployees";
import { useCreateNewTask } from "@/hooks/useCreateNewTask";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { slimFont, thinFont } from "@/app/fonts/fontWeigtht";
import MiniSpinner from "@/components/ui/MiniSpinner";
import EmployeeList from "./EmployeeList";
import PriorityList from "./PriorityList";
import { addDays, format } from "date-fns";
import { revalidatePath } from "next/cache";
import { ka } from "date-fns/locale/ka";
import CustomSelect from "./CustomSelect";
import DepartmentSelect from "./DepartmentSelect";

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
    mode: "onChange",
    defaultValues: {
      description: "",
      due_date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    },
  });
  const { createTask, isPending } = useCreateNewTask();
  const { errors } = formState;
  const { employees } = useEmployees();

  const queryClient = useQueryClient();
  const router = useRouter();
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [employee, setEmployee] = useState({
    id: "",
    name: "თანამშრომლების სია",
    avatar: "",
  });
  const [priority, setPriority] = useState(priorities[1]);
  const [status, setStatus] = useState(statuses[0]);
  const [department, setDepartment] = useState({});
  const [showEmployeeError, setShowEmployeeError] = useState(false);
  const [showDepartmentError, setShowDepartmentError] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);
  const [isInitialState, setIsInitialState] = useState(true);
  const [employeesList, setEmployeesList] = useState([]);

  useEffect(() => {
    setEmployeesList(employees);
  }, [employees]);

  useEffect(() => {
    const storedPriority = JSON.parse(localStorage.getItem("priority"));
    const storedStatus = JSON.parse(localStorage.getItem("status"));
    const storedDepartment = JSON.parse(localStorage.getItem("department"));

    const storedEmployee = JSON.parse(localStorage.getItem("employee"));

    if (storedEmployee) setEmployee(storedEmployee);
    if (storedPriority) setPriority(storedPriority);
    if (storedStatus) setStatus(storedStatus);
    if (storedDepartment) setDepartment(storedDepartment);

    setTimeout(() => setIsRestoring(false), 5000);
  }, []);

  useEffect(() => {
    const storedDepartment = JSON.parse(localStorage.getItem("department"));
    if (storedDepartment) {
      setFilteredEmployees(
        employeesList?.filter(
          (emp) => emp.department.id === storedDepartment.id
        )
      );
    }
    if (!isRestoring && department !== undefined) {
      setEmployee({
        ...employee,
        id: "",
        name: "თანამშრომლების სია",
        avatar: "",
      });
      localStorage.removeItem("employee");
    }
    if (!storedDepartment && department) {
      setFilteredEmployees(
        employeesList?.filter(
          (emp) => emp.department.id === parseInt(department.id)
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
  }, [department, reset, employeesList]);

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
    setIsInitialState(false);
    if (!department.name) {
      setShowDepartmentError(true);
      return;
    }
    if (employee.name === "თანამშრომლების სია") {
      setShowEmployeeError(true);
      return;
    }

    const formattedDate = data.due_date
      ? format(new Date(data.due_date), "yyyy-MM-dd")
      : format(addDays(new Date(), 1), "yyyy-MM-dd");

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("employee_id", employee.id);
    formData.append("priority_id", priority.id);
    formData.append("status_id", status.id);
    formData.append("due_date", formattedDate);

    createTask(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        });
        localStorage.removeItem("TaskData");
        localStorage.removeItem("employee");
        localStorage.removeItem("priority");
        localStorage.removeItem("status");
        localStorage.removeItem("department");

        router.push("/");
        revalidatePath("/");
      },
    });
  };

  return (
    <div className="flex flex-col relative  mt-[30px] bg-secondary-form">
      <form
        className="flex flex-col ml-[55px] mt-[65px] "
        onSubmit={handleSubmit(submitFunction)}
      >
        <div className="">
          <div className="flex gap-[161px] ">
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
                    errors.name ? "border-red-500" : "border-secondary-border "
                  } rounded-[5px] p-3 ${
                    thinFont.className
                  } text-primary-blackish font-thin h-[45px]`}
                  id="name"
                  type="text"
                  {...register("name", {
                    required: "მინიმუმ 3 სიმბოლო",
                    minLength: {
                      value: 3,
                      message: "მინიმუმ 3 სიმბოლო",
                    },
                    maxLength: {
                      value: 255,
                      message: "მაქსიმუმ 255 სიმბოლო",
                    },
                    onChange: () => setIsInitialState(false),
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
                  <>
                    <p
                      className={`${
                        slimFont.className
                      } text-xs flex items-center ${
                        isInitialState
                          ? "text-primary-validations"
                          : "text-primary-green"
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
                      მინიმუმ 3 სიმბოლო
                    </p>
                    <p
                      className={`${
                        slimFont.className
                      } text-xs flex items-center ${
                        isInitialState
                          ? "text-primary-validations"
                          : "text-primary-green"
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
                      მაქსიმუმ 255 სიმბოლო
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="flex relative flex-col gap-1 w-[550px] h-[64px]">
              <DepartmentSelect
                departments={departments}
                department={department}
                setDepartment={setDepartment}
                showDepartmentError={showDepartmentError}
                setShowDepartmentError={setShowDepartmentError}
              />
            </div>
          </div>
        </div>
        <div className="mt-[55px]">
          <div className="flex gap-[161px]  mt-[49px] ">
            <div className="flex flex-col gap-1 w-[550px]">
              <label
                htmlFor="description"
                className={`${slimFont.className} text-[16px] text-secondary-headlines`}
              >
                აღწერა
              </label>

              <textarea
                className={`${
                  thinFont.className
                } text-sm outline-none border border-1  ${
                  errors.description
                    ? "border-red-500"
                    : "border-secondary-border"
                } rounded-[5px] p-3 h-[135px]`}
                id="description"
                {...register("description", {
                  validate: (value) => {
                    if (!value.trim()) return true;
                    return (
                      value.trim().split(/\s+/).length >= 4 ||
                      "მინიმუმ ოთხი სიტყვა"
                    );
                  },
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
              {!errors.description && watch("description")?.trim() && (
                <p
                  className={`${slimFont.className} ${
                    isInitialState ? "text-black" : "text-primary-green"
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
                  მინიმუმ ოთხი სიტყვა
                </p>
              )}
            </div>
          </div>
          <div className="flex gap=[161px] mt-[61px]">
            <div className="flex gap-8  ">
              <PriorityList
                priorities={priorities}
                priority={priority}
                setPriority={setPriority}
              />
              <CustomSelect
                statuses={statuses}
                status={status}
                setStatus={setStatus}
              />
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
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    id="date"
                    selected={
                      field.value
                        ? new Date(field.value)
                        : addDays(new Date(), 1)
                    }
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    locale={ka}
                    placeholderText="DD/MM/YYYY"
                    calendarClassName="custom-calendar"
                    minDate={new Date()}
                    className={`outline-none border ${
                      errors.due_date ? "border-red-500" : "border-gray-400"
                    } rounded-[5px] pl-9 ${
                      thinFont.className
                    } text-primary-headlines custom-datepicker h-[45px] w-full`}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <button
          className={`${slimFont.className} flex justify-center items-center w-[208px] h-[42px] text-[18px] text-white bg-primary-violet hover:bg-secondary-violet mb-[87px] hover-smooth ml-[1053px] mt-[144px] rounded-[5px]`}
          disabled={isPending}
          onClick={() => setIsInitialState(false)}
        >
          {isPending ? <MiniSpinner /> : "დავალების შექმნა"}
        </button>
      </form>
      <div className="flex flex-col absolute top-[240px] left-[766px] ">
        {department.name && department.name !== "" && (
          <EmployeeList
            filteredEmployees={filteredEmployees}
            showEmployeeError={showEmployeeError}
            employee={employee}
            setEmployee={setEmployee}
            departments={departments}
            setShowEmployeeError={setShowEmployeeError}
          />
        )}
      </div>
    </div>
  );
}
