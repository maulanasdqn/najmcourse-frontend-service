import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postNewPassword } from "@/shared/apis/auth/api";
import { TNewPasswordRequest } from "@/shared/apis/auth/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";

export const usePostNewPassword = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TNewPasswordRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-auth-new-password"],
    mutationFn: async (payload) => await postNewPassword(payload),
  });
};
