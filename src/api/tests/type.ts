import { TResponseList, TResponseDetail } from "@/commons/types/response";
import { TQuestionItem } from "../questions/type";
import { createTestSchema, updateTestSchema } from "./schema";
import { z } from "zod";

export type TTestListItem = {
  id: string;
  name: string;
  question_count: number;
  created_at: string;
  updated_at: string;
};

export type TTestDetailItem = {
  id: string;
  name: string;
  questions: TQuestionItem[];
  created_at: string;
  updated_at: string;
};

export type TTestCreateRequest = z.infer<typeof createTestSchema>;

export type TTestUpdateRequest = z.infer<typeof updateTestSchema>;

export type TTestListResponse = TResponseList<TTestListItem>;

export type TTestDetailResponse = TResponseDetail<TTestDetailItem>;
