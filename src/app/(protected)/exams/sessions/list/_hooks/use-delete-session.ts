import { deleteSession } from "@/api/sessions/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteSession = () => {
  return useMutation({
    mutationKey: ["delete-session"],
    mutationFn: deleteSession,
  });
};
