import { postCreateUser } from "@/api/users/api";
import { TUserCreateRequest } from "@/api/users/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
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
