import { z } from "zod";
import { sessionCreateSchema, sessionUpdateSchema } from "./schema";
import type { TTestDetailItem } from "../tests/type";
import type { TResponseList, TResponseDetail } from "@/shared/commons/types/response";

type TBaseSession = {
  id: string;
  name: string;
  category: string;
  description: string;
  student_type: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export type TSessionListItem = TBaseSession & {
  tests_count: number;
};

export type TSessionDetailTestItem = {
  test: TTestDetailItem;
  weight: number;
  multiplier: number;
  start_date: string;
  end_date: string;
};

export type TSessionDetailItem = TBaseSession & {
  tests: TSessionDetailTestItem[];
};

export type TSessionCreateRequest = z.infer<typeof sessionCreateSchema>;

export type TSessionUpdateRequest = z.infer<typeof sessionUpdateSchema>;

export type TSessionListResponse = TResponseList<TSessionListItem>;

export type TSessionDetailResponse = TResponseDetail<TSessionDetailItem>;
