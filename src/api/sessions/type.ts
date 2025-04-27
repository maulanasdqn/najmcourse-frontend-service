import { TResponseList, TResponseDetail } from "@/commons/types/response";
import { z } from "zod";
import { createSessionSchema, updateSessionSchema } from "./schema";

export type TSessionItem = {
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
  test: {
    id: string;
    name: string;
    questions: Array<{
      id: string;
      question: string;
      discussion: string;
      options: Array<{
        id: string;
        label: string;
        created_at: string;
        updated_at: string;
      }>;
      created_at: string;
      updated_at: string;
    }>;
    created_at: string;
    updated_at: string;
  };
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

export type TSessionCreateRequest = z.infer<typeof createSessionSchema>;

export type TSessionUpdateRequest = z.infer<typeof updateSessionSchema> & {
  id: string;
};

export type TSessionListResponse = TResponseList<TSessionItem>;

export type TSessionDetailResponse = TResponseDetail<TSessionDetailItem>;
