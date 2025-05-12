import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postRegister } from "@/shared/apis/auth/api";
import { TRegisterRequest } from "@/shared/apis/auth/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";

export const usePostRegister = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TRegisterRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-auth-register"],
    mutationFn: async (payload) => await postRegister(payload),
  });
};
