import { postCreateSession } from "@/api/sessions/api";
import { TSessionCreateRequest } from "@/api/sessions/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostCreateSession = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TSessionCreateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-create-session"],
    mutationFn: async (payload) => await postCreateSession(payload),
  });
};
