"use client";
import { getTaskById } from "@/service/data-service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useGetTask(taskId) {
  const id = useParams();

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["task", taskId],
    queryFn: () => getTaskById(id),
  });
  return { task, isLoading, error };
}
