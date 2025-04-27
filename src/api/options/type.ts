import { TResponseList, TResponseDetail } from "@/commons/types/response";

export type TOptionItem = {
  id: string;
  label: string;
  is_correct: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type TOptionCreateRequest = {
  label: string;
  is_correct: boolean;
  image_url?: string | null;
};

export type TOptionUpdateRequest = {
  id: string;
  label: string;
  is_correct: boolean;
  image_url?: string | null;
};

export type TOptionListResponse = TResponseList<TOptionItem>;

export type TOptionDetailResponse = TResponseDetail<TOptionItem>;
