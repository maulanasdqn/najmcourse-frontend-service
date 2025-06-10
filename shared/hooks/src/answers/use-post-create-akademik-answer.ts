import { postCreateAkademikAnswer } from "@/shared/apis/answers/api";
import { TRequestCreateAnswer, TResponseAnswer } from "@/shared/apis/answers/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostCreateAkademikAnswer = (): UseMutationResult<
  TResponseAnswer,
  TResponseError,
  TRequestCreateAnswer,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-create-akademik-answer"],
    mutationFn: async (payload) => await postCreateAkademikAnswer(payload),
  });
};
