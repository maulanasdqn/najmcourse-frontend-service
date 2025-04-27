import { updatePermission } from "@/api/permissions/api";
import { TPermissionUpdateRequest } from "@/api/permissions/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutUpdatePermission = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TPermissionUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-permission"],
    mutationFn: async (payload) => await updatePermission(payload),
  });
};
