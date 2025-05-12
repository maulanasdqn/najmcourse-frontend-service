import { deleteQuestion } from "@/shared/apis/questions/api";
import { useMutation } from "@tanstack/react-query";

export const useDeleteQuestion = () => {
  return useMutation({
    mutationKey: ["delete-question"],
    mutationFn: deleteQuestion,
  });
};
