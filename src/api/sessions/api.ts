import { api } from "@/libs/axios/api";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import {
  TSessionCreateRequest,
  TSessionDetailResponse,
  TSessionListResponse,
  TSessionUpdateRequest,
} from "./type";
import { TMetaRequest } from "@/commons/types/meta";

export const getListSessions = async (params?: TMetaRequest): Promise<TSessionListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.SESSIONS.LIST,
    method: "GET",
    params,
  });
  return data;
};

export const getDetailSession = async (id: string): Promise<TSessionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.SESSIONS.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const createSession = async (
  payload: TSessionCreateRequest,
): Promise<TSessionDetailResponse> => {
  const { data } = await api({
    url: ENDPOINTS.SESSIONS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const updateSession = async (
  payload: TSessionUpdateRequest,
): Promise<TSessionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.SESSIONS.UPDATE, { id: payload.id }),
    method: "PUT",
    data: {
      name: payload.name,
      description: payload.description,
      category: payload.category,
      student_type: payload.student_type,
      tests: payload.tests,
    },
  });
  return data;
};

export const deleteSession = async (id: string): Promise<TSessionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.SESSIONS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};
