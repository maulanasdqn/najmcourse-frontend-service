import { postLogin } from "@/api/auth/api";
import { TLoginRequest, TLoginResponse } from "@/api/auth/type";
import { TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostLogin = (): UseMutationResult<
  TLoginResponse,
  TResponseError,
  TLoginRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-login"],
    mutationFn: async (payload) => await postLogin(payload),
  });
};
