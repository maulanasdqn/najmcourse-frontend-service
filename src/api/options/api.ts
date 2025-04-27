import { api } from "@/libs/axios/api";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import {
  TOptionCreateRequest,
  TOptionDetailResponse,
  TOptionListResponse,
  TOptionUpdateRequest,
} from "./type";
import { TMetaRequest } from "@/commons/types/meta";

export const getListOption = async (params?: TMetaRequest): Promise<TOptionListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.OPTIONS.LIST,
    method: "GET",
    params,
  });
  return data;
};

export const getDetailOption = async (id: string): Promise<TOptionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.OPTIONS.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const createOption = async (
  payload: TOptionCreateRequest,
): Promise<TOptionDetailResponse> => {
  const { data } = await api({
    url: ENDPOINTS.OPTIONS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const updateOption = async (
  payload: TOptionUpdateRequest,
): Promise<TOptionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.OPTIONS.UPDATE, { id: payload.id }),
    method: "PUT",
    data: {
      label: payload.label,
      is_correct: payload.is_correct,
      image_url: payload.image_url,
    },
  });
  return data;
};

export const deleteOption = async (id: string): Promise<TOptionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.OPTIONS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};
