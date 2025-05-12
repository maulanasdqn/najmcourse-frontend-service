import { activateUser } from "@/shared/apis/users/api";
import { TMessageResponse, TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useActivateUser = (): UseMutationResult<
  TMessageResponse,
  TResponseError,
  string,
  unknown
> => {
  return useMutation({
    mutationKey: ["activate-user"],
    mutationFn: activateUser,
  });
};
