import { postForgotPassword } from "@/api/auth/api";
import { TForgotPasswordParam } from "@/api/auth/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { notification } from "antd";

export const usePostForgot = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TForgotPasswordParam,
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
