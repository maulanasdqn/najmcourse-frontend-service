import { deleteUser } from "@/api/users/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = () => {
  return useMutation({
    mutationKey: ["delete-User"],
    mutationFn: deleteUser,
  });
};
