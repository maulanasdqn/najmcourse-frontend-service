import { TResponseList, TResponseDetail } from "@/commons/types/response";
import { TOptionItem } from "../options/type";

export type TQuestionItem = {
  id: string;
  question: string;
  question_image_url: string;
  discussion: string;
  discussion_image_url: string;
  options: Array<TOptionItem>;
  created_at: string;
  updated_at: string;
};

export type TQuestionCreateRequest = {
  label: string;
  option_ids: string[];
};

export type TQuestionUpdateRequest = {
  id: string;
  label: string;
  option_ids: string[];
};

export type TQuestionListResponse = TResponseList<TQuestionItem>;

export type TQuestionDetailResponse = TResponseDetail<TQuestionItem>;
