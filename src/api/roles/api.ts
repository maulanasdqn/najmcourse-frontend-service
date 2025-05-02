/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/libs/axios/api";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import {
  TRoleCreateRequest,
  TRoleDetailResponse,
  TRoleListResponse,
  TRoleUpdateRequest,
} from "./type";
import { TMetaRequest } from "@/commons/types/meta";
import { TMessageResponse } from "@/commons/types/response";

export const getListRole = async (params: TMetaRequest): Promise<TRoleListResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== ""),
  );
  const { data } = await api({
    url: ENDPOINTS.ROLES.LIST,
    method: "GET",
    params: cleanParams,
  });
  return data;
};

export const getDetailRole = async (id: string): Promise<TRoleDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.ROLES.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const createRole = async (payload: TRoleCreateRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.ROLES.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const updateRole = async (
  id: string,
  payload: TRoleUpdateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.ROLES.UPDATE, { id }),
    method: "PUT",
    data: payload,
  });
  return data;
};

export const deleteRole = async (id: string): Promise<TRoleDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.ROLES.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};
