import { api } from "@/shared/libs/axios/api";
import { cleanParams } from "@/shared/utils/clean-params";
import { generatePath } from "react-router";
import { ENDPOINTS } from "@/shared/commons/constants/endpoints";
import type { TMetaRequest } from "@/shared/commons/types/meta";
import type { TMessageResponse } from "@/shared/commons/types/response";
import type {
  TTestCreateRequest,
  TTestDetailResponse,
  TTestListResponse,
  TTestUpdateRequest,
} from "./type";

const transformTestPayload = (payload: TTestCreateRequest | TTestUpdateRequest) => ({
  ...payload,
  questions: payload.questions.map((question) => ({
    ...question,
    options: question.options.map((option) => ({
      ...option,
      points: parseFloat(option.points ?? "") || 0,
    })),
  })),
});

export const getListTest = async (params: TMetaRequest): Promise<TTestListResponse> => {
  const { data } = await api({
    url: ENDPOINTS.TESTS.LIST,
    method: "GET",
    params: cleanParams(params),
  });
  return data;
};

export const getDetailTest = async (id?: string): Promise<TTestDetailResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.TESTS.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const postCreateTest = async (payload: TTestCreateRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.TESTS.CREATE,
    method: "POST",
    data: transformTestPayload(payload),
  });
  return data;
};

export const putUpdateTest = async (payload: TTestUpdateRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.TESTS.UPDATE, { id: payload.id }),
    method: "PUT",
    data: transformTestPayload(payload),
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
