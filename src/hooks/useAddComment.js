import { BASE_URL } from "@/data/constants";
import { token } from "@/data/token";
import { createCommentByTaskId } from "@/service/apiComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddComment() {
  const queryClient = useQueryClient();

  const { mutate: addNewComment, isPending } = useMutation({
    mutationFn: createCommentByTaskId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return { addNewComment, isPending };
}
