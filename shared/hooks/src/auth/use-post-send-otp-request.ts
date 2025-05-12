import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { postSendOtp } from "@/shared/apis/auth/api";
import { TSendOtpRequest } from "@/shared/apis/auth/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";

export const usePostSendOtp = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TSendOtpRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-auth-send-otp"],
    mutationFn: async (payload) => await postSendOtp(payload),
  });
};
