import { deleteRole } from "@/shared/apis/roles/api";
import { TRoleDetailResponse } from "@/shared/apis/roles/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useDeleteRole = (): UseMutationResult<
  TRoleDetailResponse,
  TResponseError,
  string,
  unknown
> => {
  return useMutation({
    mutationKey: ["delete-role"],
    mutationFn: deleteRole,
  });
};
