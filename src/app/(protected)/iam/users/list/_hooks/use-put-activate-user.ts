import { putActivateUser } from "@/api/users/api";
import { TUserActivateRequest } from "@/api/users/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutActivateUser = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TUserActivateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-activate-user"],
    mutationFn: async (payload) => await putActivateUser(payload),
  });
};
