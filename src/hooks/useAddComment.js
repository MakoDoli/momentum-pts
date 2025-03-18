import { createCommentByTaskId } from "@/service/apiComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";

export default function useAddComment() {
  const queryClient = useQueryClient();

  const { mutate: addNewComment, isPending } = useMutation({
    mutationFn: createCommentByTaskId,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      revalidatePath("/");
    },
  });

  return { addNewComment, isPending };
}
