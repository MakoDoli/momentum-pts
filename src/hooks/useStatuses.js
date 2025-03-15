import { getStatuses } from "@/service/data-service";
import { useQuery } from "@tanstack/react-query";

export default function useStatuses() {
  const { data: statuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });
  return statuses;
}
