"use client";
import React from "react";

import CommentCard from "./CommentCard";
import { getCommentsById } from "@/service/data-service";
import { useQuery } from "@tanstack/react-query";
import MinisSpinner from "../ui/MiniSpinner";
export default function CommentsContainer({ taskId }) {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", taskId],
    queryFn: () => getCommentsById(Number(taskId)),
  });
  if (isLoading) return <MinisSpinner />;
  if (error) return <div>Error: {error.message}</div>;

  const commentsLength =
    comments.reduce((acc, comment) => acc + comment.sub_comments.length, 0) +
    comments.length;

  return (
    <div>
      <div className="flex gap-2 mb-10">
        <p className="text-[20px]">კომენტარები</p>
        <div className="w-[30px] h-[22px] text-white text-[14px] bg-primary-violet rounded-[30px] text-center">
          {commentsLength}
        </div>
      </div>
      <div className="space-y-9">
        {comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} taskId={taskId} />
        ))}
      </div>
    </div>
  );
}
