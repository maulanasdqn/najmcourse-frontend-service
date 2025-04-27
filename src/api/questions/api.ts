import { api } from "@/libs/axios/api";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import {
  TQuestionCreateRequest,
  TQuestionDetailResponse,
  TQuestionListResponse,
  TQuestionUpdateRequest,
} from "./type";
import { TMetaRequest } from "@/commons/types/meta";

export const getListQuestion = async (params?: TMetaRequest): Promise<TQuestionListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.QUESTIONS.LIST,
    method: "GET",
    params,
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

export const createQuestion = async (
  payload: TQuestionCreateRequest,
): Promise<TQuestionDetailResponse> => {
  const { data } = await api({
    url: ENDPOINTS.QUESTIONS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const updateQuestion = async (
  payload: TQuestionUpdateRequest,
): Promise<TQuestionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.QUESTIONS.UPDATE, { id: payload.id }),
    method: "PUT",
    data: {
      label: payload.label,
      option_ids: payload.option_ids,
    },
  });
  return data;
};

export const deleteQuestion = async (id: string): Promise<TQuestionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.QUESTIONS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};
