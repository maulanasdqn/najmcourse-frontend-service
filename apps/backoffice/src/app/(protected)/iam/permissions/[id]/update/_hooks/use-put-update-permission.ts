import { putUpdatePermission } from "@/shared/apis/permissions/api";
import { TPermissionUpdateRequest } from "@/shared/apis/permissions/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutUpdatePermission = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TPermissionUpdateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-permission"],
    mutationFn: async (payload) => await putUpdatePermission(payload),
  });
};
