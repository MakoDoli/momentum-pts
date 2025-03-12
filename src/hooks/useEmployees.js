import { getEmployees } from "@/service/data-service";
import { useQuery } from "@tanstack/react-query";

export function useEmployees() {
  const {
    data: employees,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });
  return { employees, isLoading, error };
}
