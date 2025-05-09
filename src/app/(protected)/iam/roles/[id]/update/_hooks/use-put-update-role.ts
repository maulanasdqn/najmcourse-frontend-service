import { putUpdateRole } from "@/api/roles/api";
import { TRoleUpdateRequest } from "@/api/roles/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutUpdateRole = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TRoleUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-Role"],
    mutationFn: async (payload) => await putUpdateRole(payload.id, payload),
  });
};
