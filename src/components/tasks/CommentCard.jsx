"use client";
import { slimFont } from "@/app/fonts/fontWeigtht";
import Image from "next/image";
import React, { useState } from "react";
import CommentForm from "./CommentForm";

export default function CommentCard({ comment, taskId }) {
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <div className="flex gap-3 items-start ">
        <Image
          className=" rounded-full "
          src={comment.author_avatar}
          width={38}
          height={38}
          alt="avatar"
        />
        <div>
          <p className="text-[18px] text-primary-headlines">
            {comment.author_nickname}
          </p>
          <p
            className={`${slimFont.className} text-[16px] min-h -[38px] mb-[10px]`}
          >
            {comment.text}
          </p>
          <div className="flex gap-1" onClick={() => setShowForm(!showForm)}>
            <Image src="/icons/reply.svg" width={16} height={16} alt="reply" />
            <p
              className={`${slimFont.className} text-[12px] text-primary-violet mb-2`}
            >
              {showForm ? "დახურვა" : "უპასუხე"}
            </p>
          </div>
          {showForm && <CommentForm parentId={comment.id} taskId={taskId} />}
          {comment.sub_comments?.map((sub) => (
            <Reply key={sub.id} comment={sub} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Reply({ comment }) {
  return (
    <div className="flex gap-3 mt-[20px] items-start ">
      <Image
        className=" rounded-full "
        src={comment.author_avatar}
        width={38}
        height={38}
        alt="avatar"
      />
      <div>
        <p className="text-[18px] text-primary-headlines">
          {comment.author_nickname}
        </p>
        <p
          className={`${slimFont.className} text-[16px] min-h -[38px] mb-[10px]`}
        >
          {comment.text}
        </p>
      </div>
    </div>
  );
}
