import { postCreatePermission } from "@/api/permissions/api";
import { TPermissionCreateRequest } from "@/api/permissions/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
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
