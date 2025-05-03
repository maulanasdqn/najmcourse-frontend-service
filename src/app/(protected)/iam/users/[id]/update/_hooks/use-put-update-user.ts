import { updateUser } from "@/api/users/api";
import { TUserUpdateRequest } from "@/api/users/type";
import { TMessageResponse, TResponseError } from "@/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePutUpdateUser = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  TUserUpdateRequest & { id: string },
  unknown
> => {
  return useMutation({
    mutationKey: ["put-update-user"],
    mutationFn: async (payload) => await updateUser(payload.id, payload),
  });
};
