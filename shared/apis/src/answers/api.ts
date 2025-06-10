import { ENDPOINTS } from "@/shared/commons/constants/endpoints";
import { api } from "@/shared/libs/axios/api";
import { generatePath } from "react-router";
import { TRequestCreateAnswer, TResponseAnswer } from "./type";

export const getDetailAnswer = async (id: string): Promise<TResponseAnswer> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.ANSWERS.DETAIL, { id }),
    method: "GET",
  });
  return data;
};

export const getDetailAnswerByTestAndUserId = async (params: {
  testId: string;
  userId: string;
}): Promise<TResponseAnswer> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.ANSWERS.DETAIL_TEST_AND_USER_ID, params),
    method: "GET",
  });
  return data;
};

export const getDetailAnswerByTestSubTestAndUserId = async (params: {
  testId: string;
  subTestId: string;
  userId: string;
}): Promise<TResponseAnswer> => {
  const { data } = await api({
    url: generatePath(ENDPOINTS.ANSWERS.DETAIL_TEST_SUB_TEST_AND_USER_ID, params),
    method: "GET",
  });
  return data;
};

export const postCreateAkademikAnswer = async (
  payload: TRequestCreateAnswer,
): Promise<TResponseAnswer> => {
  const { data } = await api({
    url: ENDPOINTS.ANSWERS.CREATE_AKADEMIK,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postCreatePsikologiAnswer = async (
  payload: TRequestCreateAnswer,
): Promise<TResponseAnswer> => {
  const { data } = await api({
    url: ENDPOINTS.ANSWERS.CREATE_PSIKOLOGI,
    method: "POST",
    data: payload,
  });
  return data;
};
