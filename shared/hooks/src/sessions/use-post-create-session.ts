import { postCreateSession } from "@/shared/apis/sessions/api";
import { TSessionCreateRequest } from "@/shared/apis/sessions/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
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
