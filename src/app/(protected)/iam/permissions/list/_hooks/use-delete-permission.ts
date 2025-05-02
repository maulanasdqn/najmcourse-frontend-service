import { deletePermission } from "@/api/permissions/api";
import { useMutation } from "@tanstack/react-query";

export const useDeletePermission = () => {
  return useMutation({
    mutationKey: ["delete-permission"],
    mutationFn: deletePermission,
  });
};
