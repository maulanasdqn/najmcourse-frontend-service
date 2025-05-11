import { putUpdateUser } from "@/shared/apis/users/api";
import { TUserUpdateRequest } from "@/shared/apis/users/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
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
