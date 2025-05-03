import { TResponseList, TResponseDetail } from "@/commons/types/response";
import { TQuestionItem } from "../questions/type";

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

export type TTestCreateRequest = {
  name: string;
  description: string;
  question_ids: string[];
};

export type TTestUpdateRequest = {
  name: string;
  description: string;
  question_ids: string[];
};

export type TTestListResponse = TResponseList<TTestListItem>;

export type TTestDetailResponse = TResponseDetail<TTestDetailItem>;
