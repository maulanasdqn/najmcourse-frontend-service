import { postUploadFile } from "@/shared/apis/storage/api";
import { TStorageResponse } from "@/shared/apis/storage/type";
import { TResponseError } from "@/shared/commons/types/response";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const usePostUploadFile = (): UseMutationResult<
  TStorageResponse,
  TResponseError,
  File,
  unknown
> => {
  return useMutation({
    mutationKey: ["post-upload-file"],
    mutationFn: async (file) => await postUploadFile(file),
  });
};
