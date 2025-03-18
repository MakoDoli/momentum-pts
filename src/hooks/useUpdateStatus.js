import { updateStatus } from "@/service/apiStatus";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateStatus() {
  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: updateStatus,
  });

  return { changeStatus, isPending };
}
