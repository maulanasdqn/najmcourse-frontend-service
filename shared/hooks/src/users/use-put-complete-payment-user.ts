import { putCompletePaymentUser } from "@/shared/apis/users/api";
import { TUserCompletePaymentRequest } from "@/shared/apis/users/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutCompletePaymentUser = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TUserCompletePaymentRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-complete-payment-user"],
    mutationFn: async (payload) => await putCompletePaymentUser(payload),
  });
};
