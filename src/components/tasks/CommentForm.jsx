"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { slimFont, thinFont } from "@/app/fonts/fontWeigtht";
import useAddComment from "@/hooks/useAddComment";
import { useQueryClient } from "@tanstack/react-query";

export default function CommentForm({ parentId, taskId }) {
  const { handleSubmit, formState, register } = useForm();
  const { errors, isSubmitting } = formState;
  const { addNewComment } = useAddComment();

  const submitFunction = (data) => {
    const queryClient = useQueryClient();
    if (data.text.trim() === "") return;

    addNewComment(
      {
        payload: { text: data.text, parent_id: parentId },
        taskId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["comments"] });
        },
      }
    );
  };
  return (
    <form
      onSubmit={handleSubmit(submitFunction)}
      className="h-[135px] border border-primary-gray rounded-[10px] px-[20px] pt-[20px] pb-[15px] bg-white mb-[66px]"
    >
      <textarea
        name="text"
        className={`${thinFont.className} text-sm outline-none w-full  ${
          errors.text ? "border-red-500 border " : "border-none"
        }  min-h-[52px]`}
        placeholder="დაწერე კომენტარი"
        id="text"
        {...register("text", {
          required: " შეიყვანეთ კომენტარი",
          minLength: {
            value: 1,
          },
        })}
      />
      <button
        className={`${slimFont.className} text-[16px] text-white bg-primary-violet px-[18px] py-2 rounded-[20px] ml-[456px] mb-[15px] `}
        disabled={isSubmitting}
      >
        დააკომენტარე
      </button>
    </form>
  );
}
