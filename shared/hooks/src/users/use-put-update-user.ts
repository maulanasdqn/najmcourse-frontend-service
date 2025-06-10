import { putUpdateBackofficeUser, putUpdateUser } from "@/shared/apis/users/api";
import { TUserUpdateBackofficeRequest, TUserUpdateRequest } from "@/shared/apis/users/type";
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

export const usePutUpdateBackofficeUser = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TUserUpdateBackofficeRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-backoffice-user"],
    mutationFn: async (payload) => await putUpdateBackofficeUser(payload),
  });
};
