import TaskDetails from "@/components/tasks/TaskDetails";
import { getTaskById } from "@/service/data-service";
import React from "react";

export const revalidate = 0;

export default async function page({ params }) {
  const task = await getTaskById(params.id, { cache: "no-store" });

  return <TaskDetails task={task} />;
}
