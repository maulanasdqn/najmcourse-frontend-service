import { postForgotPassword } from "@/shared/apis/auth/api";
import { TForgotPasswordRequest } from "@/shared/apis/auth/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { notification } from "antd";

export const usePostForgot = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TForgotPasswordRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-forgot"],
    mutationFn: async (payload) => await postForgotPassword(payload),
    onError: (error) => {
      notification.error({
        message: "Forgot Failed",
        description: (error as Error).message,
      });
    },
  });
};
