import { getCommentsById } from "@/service/data-service";
import { useQuery } from "@tanstack/react-query";

export default function useComments() {
  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: getCommentsById,
  });
  return comments;
}
