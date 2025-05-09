import type { TResponseDetail } from "@/commons/types/response";

export type TStorageItem = {
  file_url: string;
};

export type TStorageResponse = TResponseDetail<TStorageItem>;
