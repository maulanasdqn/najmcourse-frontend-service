import { updateSession } from "@/api/sessions/api";
import { TSessionUpdateRequest } from "@/api/sessions/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutUpdateSession = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TSessionUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-session"],
    mutationFn: async (payload) => await updateSession(payload),
  });
};
