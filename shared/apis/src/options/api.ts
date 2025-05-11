import { api } from "@/shared/libs/axios/api";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/shared/commons/constants/endpoints";
import { cleanParams } from "@/shared/utils/clean-params";
import type { TMetaRequest } from "@/shared/commons/types/meta";
import type { TMessageResponse } from "@/shared/commons/types/response";
import type {
  TOptionCreateRequest,
  TOptionDetailResponse,
  TOptionListResponse,
  TOptionUpdateRequest,
} from "./type";

export const getListOption = async (params?: TMetaRequest): Promise<TOptionListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.OPTIONS.LIST,
    method: "GET",
    params: cleanParams(params),
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

export const postCreateOption = async (
  payload: TOptionCreateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.OPTIONS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const putUpdateOption = async (payload: TOptionUpdateRequest): Promise<TMessageResponse> => {
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

export const deleteOption = async (id: string): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.OPTIONS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};
