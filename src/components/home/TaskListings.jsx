import React from "react";
import TaskCard from "./TaskCard";

export default function TaskListings({ tasks, status }) {
  return (
    <div className="flex flex-col gap-[30px]">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} statusName={status} />
      ))}
    </div>
  );
}
