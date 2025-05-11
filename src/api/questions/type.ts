import { z } from "zod";
import { questionCreateSchema, questionUpdateSchema } from "./schema";
import type { TOptionItem } from "../options/type";
import type { TResponseList, TResponseDetail } from "@/commons/types/response";

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

export type TQuestionListItem = {
  id: string;
  discussion: string;
  question: string;
  created_at: string;
  updated_at: string;
};

export type TQuestionCreateRequest = z.infer<typeof questionCreateSchema>;

export type TQuestionUpdateRequest = z.infer<typeof questionUpdateSchema>;

export type TQuestionListResponse = TResponseList<TQuestionListItem>;

export type TQuestionDetailResponse = TResponseDetail<TQuestionItem>;
