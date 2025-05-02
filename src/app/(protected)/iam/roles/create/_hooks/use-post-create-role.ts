import { createRole } from "@/api/roles/api";
import { TRoleCreateRequest } from "@/api/roles/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostCreateRole = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TRoleCreateRequest,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-create-Role"],
    mutationFn: async (payload) => await createRole(payload),
  });
};
