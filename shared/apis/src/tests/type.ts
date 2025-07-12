import { z } from "zod";
import { testCreateSchema, testUpdateSchema } from "./schema";
import type { TQuestionItem } from "../questions/type";
import type { TResponseList, TResponseDetail } from "@/shared/commons/types/response";

export type TSubTestItem = {
  description: string;
  id: string;
  name: string;
  questions: TQuestionItem[];
  passing_grade: number;
  banner?: string;
  category: string;
  created_at: string;
  updated_at: string;
};

export type TTestListItem = {
  id: string;
  name: string;
  category: string;
  banner: string;
  question_count: number;
  created_at: string;
  updated_at: string;
};

export type TTestDetailItem = {
  id: string;
  name: string;
  category: string;
  banner: string;
  questions: TQuestionItem[];
  sub_tests?: TSubTestItem[];
  created_at: string;
  updated_at: string;
};

export type TTestCreateRequest = z.infer<typeof testCreateSchema>;

export type TTestUpdateRequest = z.infer<typeof testUpdateSchema>;

export type TTestListResponse = TResponseList<TTestListItem>;

export type TTestDetailResponse = TResponseDetail<TTestDetailItem>;
