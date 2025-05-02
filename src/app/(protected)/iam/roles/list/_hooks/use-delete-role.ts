import { deleteRole } from "@/api/roles/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteRole = () => {
  return useMutation({
    mutationKey: ["delete-Role"],
    mutationFn: deleteRole,
  });
};
