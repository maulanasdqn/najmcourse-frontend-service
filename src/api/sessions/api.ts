import { api } from "@/libs/axios/api";
import { cleanParams } from "@/utils/clean-params";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import type { TMetaRequest } from "@/commons/types/meta";
import type { TMessageResponse } from "@/commons/types/response";
import type {
  TSessionCreateRequest,
  TSessionDetailResponse,
  TSessionListResponse,
  TSessionUpdateRequest,
} from "./type";

export const getListSession = async (params: TMetaRequest): Promise<TSessionListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.SESSIONS.LIST,
    method: "GET",
    params: cleanParams(params),
  });
  return data;
};

export const getDetailSession = async (id?: string): Promise<TSessionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.SESSIONS.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const postCreateSession = async (
  payload: TSessionCreateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.SESSIONS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const putUpdateSession = async (
  payload: TSessionUpdateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.SESSIONS.UPDATE, { id: payload.id }),
    method: "PUT",
    data: payload,
  });
  return data;
};

export const deleteSession = async (id: string): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.SESSIONS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};
