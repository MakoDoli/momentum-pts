import TaskDetails from "@/components/tasks/TaskDetails";
import { getTaskById } from "@/service/data-service";
import React from "react";

export default async function page({ params }) {
  const task = await getTaskById(params.id);

  return <TaskDetails task={task} />;
}
