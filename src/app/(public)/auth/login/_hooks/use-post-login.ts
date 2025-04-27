import { postLogin } from "@/api/auth/api";
import { TLoginParam, TLoginResponse } from "@/api/auth/type";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { notification } from "antd";

export const usePostLogin = (): UseMutationResult<
  TLoginResponse,
  unknown,
  TLoginParam,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-login"],
    mutationFn: async (payload) => await postLogin(payload),
    onError: (error) => {
      notification.error({
        message: "Login Failed",
        description: (error as Error).message,
      });
    },
  });
};
