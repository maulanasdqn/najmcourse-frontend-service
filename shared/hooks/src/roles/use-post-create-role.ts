import { postCreateRole } from "@/shared/apis/roles/api";
import { TRoleCreateRequest } from "@/shared/apis/roles/type";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostCreateRole = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TRoleCreateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-create-role"],
    mutationFn: async (payload) => await postCreateRole(payload),
  });
};
