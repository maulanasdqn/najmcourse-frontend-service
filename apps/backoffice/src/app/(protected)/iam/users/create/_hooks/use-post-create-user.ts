import { postCreateUser } from "@/shared/apis/users/api";
import { TUserCreateRequest } from "@/shared/apis/users/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostCreateUser = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TUserCreateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-create-user"],
    mutationFn: async (payload) => await postCreateUser(payload),
  });
};
