import React from "react";
import TaskListings from "./TaskListings";

export default function TasksContainer({ tasks }) {
  const notStarted = tasks.filter((t) => t.status.id === 1);
  const inProgress = tasks.filter((t) => t.status.id === 2);
  const forTesting = tasks.filter((t) => t.status.id === 3);
  const completed = tasks.filter((t) => t.status.id === 4);

  return (
    <div className="flex gap-[52px]">
      <TaskListings tasks={notStarted} status="notStarted" />
      <TaskListings tasks={inProgress} status="inProgress" />
      <TaskListings tasks={forTesting} status="forTesting" />
      <TaskListings tasks={completed} status="completed" />
    </div>
  );
}
