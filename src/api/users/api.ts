/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/libs/axios/api";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import {
  TUserCreateRequest,
  TUserDetailResponse,
  TUserListResponse,
  TUserUpdateRequest,
  TGetUsersParams,
} from "./type";
import { TMessageResponse } from "@/commons/types/response";

export const getListUser = async (params: TGetUsersParams): Promise<TUserListResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== ""),
  );
  const { data } = await api({
    url: ENDPOINTS.USERS.LIST,
    method: "GET",
    params: cleanParams,
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

export const createUser = async (payload: TUserCreateRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.USERS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const updateUser = async (
  id: string,
  payload: TUserUpdateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.USERS.UPDATE, { id }),
    method: "PUT",
    data: payload,
  });
  return data;
};

export const deleteUser = async (id: string): Promise<TUserDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.USERS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};

export const activateUser = async (id: string): Promise<TUserDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.USERS.ACTIVATE, { id }),
    method: "PATCH",
  });
  return data;
};
