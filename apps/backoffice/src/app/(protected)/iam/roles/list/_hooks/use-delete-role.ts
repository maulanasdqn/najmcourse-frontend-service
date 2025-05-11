import { deleteRole } from "@/shared/apis/roles/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRole = () => {
  return useMutation({
    mutationKey: ["delete-Role"],
    mutationFn: deleteRole,
  });
};
