import { api } from "@/libs/axios/api";
import { cleanParams } from "@/utils/clean-params";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import type { TMetaRequest } from "@/commons/types/meta";
import type { TMessageResponse } from "@/commons/types/response";
import type {
  TPermissionCreateRequest,
  TPermissionDetailResponse,
  TPermissionListResponse,
  TPermissionUpdateRequest,
} from "./type";

export const getListPermission = async (params: TMetaRequest): Promise<TPermissionListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.PERMISSIONS.LIST,
    method: "GET",
    params: cleanParams(params),
  });

  return data;
};

export const getDetailPermission = async (id?: string): Promise<TPermissionDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.PERMISSIONS.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const postCreatePermission = async (
  payload: TPermissionCreateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.PERMISSIONS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const putUpdatePermission = async (
  payload: TPermissionUpdateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.PERMISSIONS.UPDATE, { id: payload.id }),
    method: "PUT",
    data: payload,
  });
  return data;
};

export const deletePermission = async (id: string): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.PERMISSIONS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};
