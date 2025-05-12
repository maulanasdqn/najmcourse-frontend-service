import { postCreateQuestion } from "@/shared/apis/questions/api";
import { TQuestionCreateRequest } from "@/shared/apis/questions/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostCreateQuestion = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TQuestionCreateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-create-question"],
    mutationFn: async (payload) => await postCreateQuestion(payload),
  });
};
