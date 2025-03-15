import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewEmployee } from "@/service/apiEmployee";

export function useAddEmployee() {
  const queryClient = useQueryClient();
  const { mutate: addNewEmployee, isPending } = useMutation({
    mutationFn: createNewEmployee,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return { addNewEmployee, isPending };
}
