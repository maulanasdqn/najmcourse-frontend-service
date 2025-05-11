import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { putUpdateTest } from "@/api/tests/api";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { TTestUpdateRequest } from "@/api/tests/type";

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
