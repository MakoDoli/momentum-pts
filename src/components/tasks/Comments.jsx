import React from "react";

import CommentsContainer from "./CommentsContainer";
import CommentForm from "./CommentForm";

export default function Comments({ taskId }) {
  return (
    <div className="w-[745px]  bg-secondary-form px-[45px] py-10 pb-[52px]  ">
      <CommentForm taskId={taskId} parentId={null} />
      <CommentsContainer taskId={taskId} />
    </div>
  );
}
