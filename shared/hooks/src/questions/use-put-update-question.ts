import { putUpdateQuestion } from "@/shared/apis/questions/api";
import { TQuestionUpdateRequest } from "@/shared/apis/questions/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutUpdateQuestion = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TQuestionUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-question"],
    mutationFn: async (payload) => await putUpdateQuestion(payload),
  });
};
