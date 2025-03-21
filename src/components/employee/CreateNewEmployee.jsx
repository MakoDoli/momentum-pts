/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { slimFont, thinFont } from "@/app/fonts/fontWeigtht";
import { useAddEmployee } from "@/hooks/useAddEmployese";
import MinisSpinner from "../ui/MiniSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateNewEmployee({
  setOpen,
  departments,
  setIsModalOpen,
  setIsSelectOpen,
}) {
  const onClose = () => {
    setOpen();
    if (setIsModalOpen) setIsModalOpen();
  };
  const { addNewEmployee, isPending } = useAddEmployee();

  const { register, control, handleSubmit, formState, reset, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      surname: "",
      avatar: null,
    },
  });

  const { errors } = formState;

  const file = watch("avatar");
  const [filePreview, setFilePreview] = useState(null);
  const [isInitialState, setIsInitialState] = useState({
    name: true,
    surname: true,
  });

  useEffect(() => {
    if (file && file[0]?.name) {
      const newUrl = URL.createObjectURL(file[0]);
      if (newUrl !== filePreview) {
        setFilePreview(newUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setFilePreview(null);
    reset({ avatar: null });
  };

  const submitFunction = (data) => {
    const formData = new FormData();
    const avatar = data.avatar[0];
    formData.append("name", data.name);
    formData.append("surname", data.surname || "");
    formData.append("avatar", avatar);
    formData.append("department_id", data.department_id);

    setTimeout(() => {
      setOpen();
      //setIsSelectOpen(false);
      if (setIsModalOpen) setIsModalOpen(false);
    }, 1000);
    addNewEmployee(formData);
  };

  return (
    <form
      className="flex flex-col gap-[45px]"
      onSubmit={handleSubmit(submitFunction)}
    >
      <div className="flex gap-[45px]">
        <div className="flex flex-col gap-1 w-[384px] h-[64px]">
          <label htmlFor="name" className="text-secondary-headlines">
            სახელი*
          </label>

          <input
            className={`outline-none border ${
              errors.name ? "border-red-500" : "border-secondary-validations"
            } rounded-lg p-3 h-[42px] ${
              slimFont.className
            } text-sm text-primary-headlines `}
            id="name"
            type="text"
            autoFocus={false}
            {...register("name", {
              required: "მინიმუმ ორი სიმბოლო",
              minLength: {
                value: 2,
                message: "მინიმუმ 2 სიმბოლო",
              },
              maxLength: {
                value: 255,
                message: "მაქსიმუმ 255 სიმბოლო",
              },
              pattern: {
                value: /^[ა-ჰa-zA-Z]+$/i,
                message: "მხოლოდ ასოებია ნებადართული",
              },
              onChange: () =>
                setIsInitialState({ ...isInitialState, name: false }),
            })}
          />
          {errors.name && (
            <p
              className={`${slimFont.className} text-red-500 text-[10px] flex items-center gap-2`}
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
            <div className="space-y-0">
              <p
                className={`${slimFont.className} ${
                  isInitialState.name
                    ? "text-primary-validation"
                    : "text-primary-green"
                } text-[10px] flex items-center h-4 gap-2`}
              >
                <span>
                  <Image
                    src={
                      isInitialState.name
                        ? "/icons/check.png"
                        : "/icons/green-check.png"
                    }
                    width={10}
                    height={8}
                    alt="check"
                  />
                </span>
                მინიმუმ 2 სიმბოლო
              </p>
              <p
                className={`${slimFont.className} ${
                  isInitialState.name
                    ? "text-primary-validation"
                    : "text-primary-green"
                } text-[10px] flex items-center h-4 gap-2`}
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
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 w-[384px] h-[64px]">
          <label htmlFor="surname" className="text-secondary-headlines">
            გვარი*
          </label>

          <input
            className={`outline-none border ${
              errors.surname ? "border-red-500" : "border-secondary-validations"
            } rounded-lg p-3 h-[42px] text-primary-headlines ${
              slimFont.className
            } text-sm`}
            id="surname"
            type="text"
            {...register("surname", {
              required: "მინიმუმ ორი სიმბოლო",
              minLength: {
                value: 2,
                message: "მინიმუმ 2 სიმბოლო",
              },
              maxLength: {
                value: 255,
                message: "მაქსიმუმ 255 სიმბოლო",
              },
              pattern: {
                value: /^[ა-ჰa-zA-Z]+$/i,
                message: "მხოლოდ ასოებია ნებადართული",
              },
              onChange: () =>
                setIsInitialState({ ...isInitialState, surname: false }),
            })}
          />
          {errors.surname && (
            <p
              className={`${slimFont.className} text-red-500 text-[10px] flex items-center gap-2`}
            >
              <span>
                <Image
                  src="/icons/red-check.png"
                  width={10}
                  height={8}
                  alt="check"
                />
              </span>
              {errors.surname?.message}
            </p>
          )}
          {!errors.surname && (
            <div className="space-y-0">
              <p
                className={`${slimFont.className} ${
                  isInitialState.surname
                    ? "text-primary-validation"
                    : "text-primary-green"
                } text-[10px] flex items-center h-4 gap-2`}
              >
                <span>
                  <Image
                    src={
                      isInitialState.surname
                        ? "/icons/check.png"
                        : "/icons/green-check.png"
                    }
                    width={10}
                    height={8}
                    alt="check"
                  />
                </span>
                მინიმუმ 2 სიმბოლო
              </p>
              <p
                className={`${slimFont.className} ${
                  isInitialState.surname
                    ? "text-primary-validation"
                    : "text-primary-green"
                } text-[10px] flex items-center h-4 gap-2`}
              >
                <span>
                  <Image
                    src={
                      isInitialState.surname
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
            </div>
          )}
        </div>
      </div>
      <div className="mt-[45px] flex flex-col gap-1">
        <label htmlFor="" className="text-secondary-headlines">
          ავატარი*
        </label>
        <label
          htmlFor="avatar"
          className={`${!filePreview && "cursor-pointer"}`}
        >
          <div className="border h-[120px] border-secondary-validations rounded-lg p-3 relative  border-dashed flex justify-center items-center">
            {filePreview ? (
              <>
                <div
                  onClick={(e) => handleRemoveImage(e)}
                  className={`absolute   top-[80px] left-[422px] z-30 cursor-pointer`}
                >
                  <img src="./icons/trash.svg" alt="remove" />
                </div>
                <img
                  src={filePreview}
                  alt="preview"
                  className="w-[88px] h-[88px] absolute rounded-full"
                />
              </>
            ) : (
              <span className="flex flex-col items-center gap-1">
                <Image
                  src="/icons/plus-circle.png"
                  alt="add"
                  width={24}
                  height={24}
                />
                <p
                  className={`${slimFont.className} text-sm text-secondary-headlines`}
                >
                  ატვირთე ფოტო
                </p>
              </span>
            )}
          </div>
        </label>
        <div>
          {!filePreview && (
            <input
              className="hidden"
              id="avatar"
              type="file"
              accept="image/*"
              {...register("avatar", {
                required: "სავალდებულო ველი",
                validate: {
                  size: (files) =>
                    files[0]?.size <= 1 * 600 * 1024 ||
                    "ფოტოს ზომა არ უნდა აღემატებოდეს 600kb-ს",
                  fileType: (files) =>
                    ["image/jpeg", "image/png", "image/jpg"].includes(
                      files[0]?.type
                    ) || "მხოლოდ PNG, JPG ან JPEG ტიპის ფაილებია ნებადართული",
                },
              })}
            />
          )}
          {errors.avatar && (
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
              {errors.avatar?.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 w-[384px] h-[64px]">
        <label htmlFor="department_id" className="text-secondary-headlines">
          დეპარტამენტი*
        </label>
        <Controller
          name="department_id"
          control={control}
          rules={{ required: "აირჩიეთ დეპარტამენტი" }}
          render={({ field }) => {
            const selectedDepartment = departments.find(
              (dep) => dep.id === Number(field.value)
            );

            return (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger
                  className={`${thinFont.className} outline-none border ${
                    errors.department_id ? "border-red-500" : "border-gray-400"
                  } rounded-lg p-2 h-[42px] text-[14px]`}
                >
                  <SelectValue
                    className={`${
                      thinFont.className
                    } outline-none border border-1  ${
                      errors.department_id
                        ? "border-red-500"
                        : "border-gray-400"
                    } rounded-lg p-2 h-[42px] text-[14px] `}
                  >
                    {selectedDepartment ? selectedDepartment.name : ""}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="border border-primary-violet">
                  {departments?.map((department) => (
                    <SelectItem
                      key={department.id}
                      value={department.id}
                      className={`${thinFont.className} text-primary-blackish text-[14px] `}
                    >
                      {department.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
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
      <div className="flex gap-[22px] h-[42px] justify-end w-full mt-[20px]">
        <button
          onClick={onClose}
          type="button"
          className={`text-primary-headlines ${slimFont.className} text-[16px] w-[102px] h-[42px] flex justify-center items-center  border border-primary-violet hover:border-secondary-violet rounded-[5px] hover-smooth  cursor-pointer`}
        >
          გაუქმება
        </button>
        <button
          className="p-3 bg-buttonOrange w-[263px] h-[42px] bg-primary-violet hover:bg-secondary-violet text-[18px] text-white hover-smooth rounded-[5px]"
          onClick={() => setIsInitialState(false)}
          disabled={isPending}
        >
          {isPending ? (
            <MinisSpinner />
          ) : (
            <p className={`${slimFont.className} text-[16px]`}>
              დაამატე თანამშრომელი
            </p>
          )}
        </button>
      </div>
    </form>
  );
}
