import { putUpdateRole } from "@/shared/apis/roles/api";
import { TRoleUpdateRequest } from "@/shared/apis/roles/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutUpdateRole = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TRoleUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-role"],
    mutationFn: async (payload) => await putUpdateRole(payload),
  });
};
