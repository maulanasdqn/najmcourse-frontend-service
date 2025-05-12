import { postCreateOption } from "@/shared/apis/options/api";
import { TOptionCreateRequest } from "@/shared/apis/options/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostCreateOption = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TOptionCreateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-create-option"],
    mutationFn: async (payload) => await postCreateOption(payload),
  });
};
