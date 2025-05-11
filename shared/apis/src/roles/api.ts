import { api } from "@/shared/libs/axios/api";
import { cleanParams } from "@/shared/utils/clean-params";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/shared/commons/constants/endpoints";
import type { TMetaRequest } from "@/shared/commons/types/meta";
import type { TMessageResponse } from "@/shared/commons/types/response";
import type {
  TRoleCreateRequest,
  TRoleDetailResponse,
  TRoleListResponse,
  TRoleUpdateRequest,
} from "./type";

export const getListRole = async (params: TMetaRequest): Promise<TRoleListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.ROLES.LIST,
    method: "GET",
    params: cleanParams(params),
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

export const postCreateRole = async (payload: TRoleCreateRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.ROLES.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const putUpdateRole = async (
  id: string,
  payload: TRoleUpdateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.ROLES.UPDATE, { id }),
    method: "PUT",
    data: {
      ...payload,
      overwrite: true,
    },
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
