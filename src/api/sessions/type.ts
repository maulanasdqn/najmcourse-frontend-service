import { TResponseList, TResponseDetail } from "@/commons/types/response";
import { z } from "zod";
import { sessionSchema } from "./schema";
import { TTestDetailItem } from "../tests/type";

export type TSessionListItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  student_type: string;
  tests_count: number;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export type TSessionDetailTestItem = {
  test: TTestDetailItem;
  weight: number;
  multiplier: number;
  start_date: string;
  end_date: string;
};

export type TSessionDetailItem = {
  id: string;
  name: string;
  category: string;
  description: string;
  student_type: string;
  tests: TSessionDetailTestItem[];
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
};

export type TSessionCreateRequest = z.infer<typeof sessionSchema>;

export type TSessionUpdateRequest = z.infer<typeof sessionSchema> & {
  id: string;
};

export type TSessionListResponse = TResponseList<TSessionListItem>;
export type TSessionDetailResponse = TResponseDetail<TSessionDetailItem>;
