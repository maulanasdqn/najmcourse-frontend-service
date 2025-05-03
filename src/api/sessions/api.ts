/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { TMessageResponse } from "@/commons/types/response";

export const getListSession = async (params: TMetaRequest): Promise<TSessionListResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== ""),
  );
  const { data } = await api({
    url: ENDPOINTS.SESSIONS.LIST,
    method: "GET",
    params: cleanParams,
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

export const createSession = async (payload: TSessionCreateRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.SESSIONS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const updateSession = async (payload: TSessionUpdateRequest): Promise<TMessageResponse> => {
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
