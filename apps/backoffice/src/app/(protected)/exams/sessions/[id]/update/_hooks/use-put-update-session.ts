import { putUpdateSession } from "@/shared/apis/sessions/api";
import { TSessionUpdateRequest } from "@/shared/apis/sessions/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutUpdateSession = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TSessionUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-session"],
    mutationFn: async (payload) => await putUpdateSession(payload),
  });
};
