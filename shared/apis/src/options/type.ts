import { z } from "zod";
import { optionCreateSchema, optionUpdateSchema } from "./schema";
import type { TResponseList, TResponseDetail } from "@/commons/types/response";

export type TOptionItem = {
  id: string;
  label: string;
  is_correct: boolean;
  image_url: string | null;
  points: number;
  created_at: string;
  updated_at: string;
};

export type TOptionCreateRequest = z.infer<typeof optionCreateSchema>;

export type TOptionUpdateRequest = z.infer<typeof optionUpdateSchema>;

export type TOptionListResponse = TResponseList<TOptionItem>;

export type TOptionDetailResponse = TResponseDetail<TOptionItem>;
