import { updateStatus } from "@/service/apiStatus";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateStatus() {
  const queryClient = useQueryClient();
  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries(["statuses"]);
      console.log("EGARIII");
    },
  });

  return { changeStatus, isPending };
}
