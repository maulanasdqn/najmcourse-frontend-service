import { deletePermission } from "@/api/permissions/api";
import { useMutation } from "@/app/_hooks/request/use-mutation";

export const useDeletePermission = () => {
  return useMutation({
    mutationKey: ["delete-permission"],
    mutationFn: deletePermission,
  });
};
