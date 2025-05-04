import { api } from "@/libs/axios/api";
import { TStorageResponse } from "./type";

export const postUploadFile = async (file: File): Promise<TStorageResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/storage/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
