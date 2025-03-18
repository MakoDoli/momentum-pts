import { getTasks } from "@/service/data-service";
import { useQuery } from "@tanstack/react-query";

export function useTasks() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  return { tasks, isLoading, error };
}
