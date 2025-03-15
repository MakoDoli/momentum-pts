import { createNewTask } from "@/service/apiTasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateNewTask() {
  const queryClient = useQueryClient();
  const { mutate: createTask, isPending } = useMutation({
    mutationFn: createNewTask,
    // onSuccess: () => {
    //   queryClient.invalidateQueries(["tasks"]);
    // },
  });

  return { createTask, isPending };
}
