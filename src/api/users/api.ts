import { api } from "@/libs/axios/api";
import { cleanParams } from "@/utils/clean-params";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import type { TMetaRequest } from "@/commons/types/meta";
import type { TMessageResponse } from "@/commons/types/response";
import type {
  TUserCreateRequest,
  TUserDetailResponse,
  TUserListResponse,
  TUserUpdateRequest,
} from "./type";

export const getListUser = async (params: TMetaRequest): Promise<TUserListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.USERS.LIST,
    method: "GET",
    params: cleanParams(params),
  });
  return data;
};

export const getDetailUser = async (id: string): Promise<TUserDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.USERS.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const postCreateUser = async (payload: TUserCreateRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.USERS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const putUpdateUser = async (payload: TUserUpdateRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.USERS.UPDATE, { id: payload.id }),
    method: "PUT",
    data: payload,
  });
  return data;
};

export const deleteUser = async (id: string): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.USERS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};

export const activateUser = async (id: string): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.USERS.ACTIVATE, { id }),
    method: "PATCH",
  });
  return data;
};
