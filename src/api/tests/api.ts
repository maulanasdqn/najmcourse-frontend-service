import { api } from "@/libs/axios/api";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import {
  TTestCreateRequest,
  TTestDetailResponse,
  TTestListResponse,
  TTestUpdateRequest,
} from "./type";
import { TMetaRequest } from "@/commons/types/meta";

export const getListTest = async (params?: TMetaRequest): Promise<TTestListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.TESTS.LIST,
    method: "GET",
    params,
  });
  return data;
};

export const getDetailTest = async (id: string): Promise<TTestDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.TESTS.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const createTest = async (payload: TTestCreateRequest): Promise<TTestDetailResponse> => {
  const { data } = await api({
    url: ENDPOINTS.TESTS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const updateTest = async (
  id: string,
  payload: TTestUpdateRequest,
): Promise<TTestDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.TESTS.UPDATE, { id }),
    method: "PUT",
    data: {
      title: payload.title,
      description: payload.description,
      question_ids: payload.question_ids,
    },
  });
  return data;
};

export const deleteTest = async (id: string): Promise<TTestDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.TESTS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};
