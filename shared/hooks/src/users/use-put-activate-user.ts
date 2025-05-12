import { putActivateUser } from "@/shared/apis/users/api";
import { TUserActivateRequest } from "@/shared/apis/users/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
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
