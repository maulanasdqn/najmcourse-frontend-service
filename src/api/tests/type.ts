import { TResponseList, TResponseDetail } from "@/commons/types/response";
import { TQuestionItem } from "../questions/type";

export type TTestItem = {
  id: string;
  title: string;
  description: string;
  questions: TQuestionItem[];
  created_at: string;
  updated_at: string;
};

export type TTestCreateRequest = {
  title: string;
  description: string;
  question_ids: string[];
};

export type TTestUpdateRequest = {
  title: string;
  description: string;
  question_ids: string[];
};

export type TTestListResponse = TResponseList<TTestItem>;

export type TTestDetailResponse = TResponseDetail<TTestItem>;
