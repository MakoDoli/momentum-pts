"use client";
import React, { useContext, useEffect, useState } from "react";
import TaskListings from "./TaskListings";
import { FilterContext } from "@/providers/FilterProvider";
import { filterTasks } from "@/lib/helper";

export default function TasksContainer({ tasks }) {
  const { filters } = useContext(FilterContext);
  const [filteredTasks, setFilteredTasks] = useState([]);
  useEffect(() => {
    if (tasks) {
      if (filters.length > 0) {
        const filtered = filterTasks(filters, tasks);

        setFilteredTasks(filtered);
      } else {
        setFilteredTasks(tasks);
      }
    }
  }, [filters, tasks]);

  const notStarted = filteredTasks.filter((t) => t.status.id === 1);
  const inProgress = filteredTasks.filter((t) => t.status.id === 2);
  const forTesting = filteredTasks.filter((t) => t.status.id === 3);
  const completed = filteredTasks.filter((t) => t.status.id === 4);

  return (
    <div className="flex gap-[52px] mb-[151px]">
      <TaskListings tasks={notStarted} status="notStarted" />
      <TaskListings tasks={inProgress} status="inProgress" />
      <TaskListings tasks={forTesting} status="forTesting" />
      <TaskListings tasks={completed} status="completed" />
    </div>
  );
}
