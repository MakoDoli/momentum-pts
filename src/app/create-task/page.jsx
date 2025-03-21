import React from "react";
import { boldFont } from "../fonts/fontWeigtht";
import CreateNewTask from "@/components/tasks/CreateNewTask";
import {
  getDepartments,
  getPriorities,
  getStatuses,
} from "@/service/data-service";

export default async function page() {
  const [departments, priorities, statuses] = await Promise.all([
    getDepartments(),
    getPriorities(),
    getStatuses(),
  ]);
  return (
    <div>
      <h1
        className={`${boldFont.className} text-[34px] text-primary-headlines mt-[140px]`}
      >
        შექმენი ახალი დავალება
      </h1>
      <CreateNewTask
        departments={departments}
        priorities={priorities}
        statuses={statuses}
      />
    </div>
  );
}
