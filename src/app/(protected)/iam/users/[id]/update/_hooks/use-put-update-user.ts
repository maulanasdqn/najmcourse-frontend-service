import { putUpdateUser } from "@/api/users/api";
import { TUserUpdateRequest } from "@/api/users/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutUpdateUser = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TUserUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-user"],
    mutationFn: async (payload) => await putUpdateUser(payload),
  });
};
