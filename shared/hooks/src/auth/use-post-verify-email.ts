import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postVerifyEmail } from "@/shared/apis/auth/api";
import { TVerifyEmailRequest } from "@/shared/apis/auth/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";

export const usePostVerifyEmail = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TVerifyEmailRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-auth-verify-email"],
    mutationFn: async (payload) => await postVerifyEmail(payload),
  });
};
