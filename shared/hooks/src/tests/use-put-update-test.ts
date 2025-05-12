import { putUpdateTest } from "@/shared/apis/tests/api";
import { TTestUpdateRequest } from "@/shared/apis/tests/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

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
