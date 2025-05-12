import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postLogin } from "@/shared/apis/auth/api";
import { TLoginRequest, TLoginResponse } from "@/shared/apis/auth/type";
import { TResponseError } from "@/shared/commons/types/response";

export const usePostLogin = (): UseMutationResult<
  TLoginResponse,
  TResponseError,
  TLoginRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-auth-login"],
    mutationFn: async (payload) => await postLogin(payload),
  });
};
