import { putUpdateOption } from "@/shared/apis/options/api";
import { TOptionUpdateRequest } from "@/shared/apis/options/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutUpdateOption = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TOptionUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-option"],
    mutationFn: async (payload) => await putUpdateOption(payload),
  });
};
