import { api } from "@/libs/axios/api";
import { cleanParams } from "@/utils/clean-params";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import type { TMetaRequest } from "@/commons/types/meta";
import type { TMessageResponse } from "@/commons/types/response";
import type {
  TQuestionCreateRequest,
  TQuestionDetailResponse,
  TQuestionListResponse,
  TQuestionUpdateRequest,
} from "./type";

export const getListQuestion = async (params?: TMetaRequest): Promise<TQuestionListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.QUESTIONS.LIST,
    method: "GET",
    params: cleanParams(params),
  });
  return data;
};

export const getDetailQuestion = async (id: string): Promise<TQuestionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.QUESTIONS.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const postCreateQuestion = async (
  payload: TQuestionCreateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.QUESTIONS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const putUpdateQuestion = async (
  payload: TQuestionUpdateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.QUESTIONS.UPDATE, { id: payload.id }),
    method: "PUT",
    data: payload,
  });
  return data;
};

export const deleteQuestion = async (id: string): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.QUESTIONS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};
