import { TResponseList, TResponseDetail } from "@/commons/types/response";
import { TQuestionItem } from "../questions/type";
import { testSchema } from "./schema";
import { z } from "zod";

export type TTestListItem = {
  id: string;
  name: string;
  description: string;
  question_count: number;
  created_at: string;
  updated_at: string;
};

export type TTestDetailItem = {
  id: string;
  name: string;
  description: string;
  questions: TQuestionItem[];
  created_at: string;
  updated_at: string;
};

export type TTestRequest = z.infer<typeof testSchema>;

export type TTestListResponse = TResponseList<TTestListItem>;

export type TTestDetailResponse = TResponseDetail<TTestDetailItem>;
