import { postCreatePermission } from "@/shared/apis/permissions/api";
import { TPermissionCreateRequest } from "@/shared/apis/permissions/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostCreatePermission = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TPermissionCreateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-create-permission"],
    mutationFn: async (payload) => await postCreatePermission(payload),
  });
};
