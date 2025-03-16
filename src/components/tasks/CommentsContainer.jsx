import React from "react";

import CommentCard from "./CommentCard";
import { getCommentsById } from "@/service/data-service";
export default async function CommentsContainer({ taskId }) {
  const comments = await getCommentsById(taskId);
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
      <div>
        {comments?.map((comment) => (
          <CommentCard key={comment.id} comment={comment} taskId={taskId} />
        ))}
      </div>
    </div>
  );
}
