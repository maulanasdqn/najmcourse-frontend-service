import { createTest } from "@/api/tests/api";
import { TTestCreateRequest } from "@/api/tests/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostCreateTest = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TTestCreateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-create-test"],
    mutationFn: async (payload) => await createTest(payload),
  });
};
