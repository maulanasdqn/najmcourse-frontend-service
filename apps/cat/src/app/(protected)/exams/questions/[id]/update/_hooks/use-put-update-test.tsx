import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { putUpdateTest } from "@/shared/apis/tests/api";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { TTestUpdateRequest } from "@/shared/apis/tests/type";

export const usePutUpdateTest = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TTestUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-test"],
    mutationFn: async (payload) => await putUpdateTest(payload),
  });
};
