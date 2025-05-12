import { postCreateTest } from "@/shared/apis/tests/api";
import { TTestCreateRequest } from "@/shared/apis/tests/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostCreateTest = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TTestCreateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-create-test"],
    mutationFn: async (payload) => await postCreateTest(payload),
  });
};
