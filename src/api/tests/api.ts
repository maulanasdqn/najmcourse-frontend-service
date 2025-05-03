/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from "@/libs/axios/api";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import {
  TTestCreateRequest,
  TTestDetailResponse,
  TTestListResponse,
  TTestUpdateRequest,
} from "./type";
import { TMetaRequest } from "@/commons/types/meta";
import { TMessageResponse } from "@/commons/types/response";

export const getListTest = async (params: TMetaRequest): Promise<TTestListResponse> => {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== ""),
  );
  const { data } = await api({
    url: ENDPOINTS.TESTS.LIST,
    method: "GET",
    params: cleanParams,
  });
  return data;
};

export const getDetailTest = async (id: string): Promise<TTestDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.TESTS.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const createTest = async (payload: TTestCreateRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.TESTS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};

export const updateTest = async (
  id: string,
  payload: TTestUpdateRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.TESTS.UPDATE, { id }),
    method: "PUT",
    data: payload,
  });
  return data;
};

export const deleteTest = async (id: string): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.TESTS.DELETE, { id }),
    method: "DELETE",
  });
  return data;
};
