import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postForgotPassword } from "@/shared/apis/auth/api";
import { TForgotPasswordRequest } from "@/shared/apis/auth/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";

export const usePostForgotPassword = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TForgotPasswordRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-auth-forgot-password"],
    mutationFn: async (payload) => await postForgotPassword(payload),
  });
};
