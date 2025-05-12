import { deleteOption } from "@/shared/apis/options/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteOption = () => {
  return useMutation({
    mutationKey: ["delete-option"],
    mutationFn: deleteOption,
  });
};
