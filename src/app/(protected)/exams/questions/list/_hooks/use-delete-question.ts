import { deleteQuestion } from "@/api/questions/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteQuestion = () => {
  return useMutation({
    mutationKey: ["delete-question"],
    mutationFn: deleteQuestion,
  });
};
