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

export const postCreateAnswer = async (payload: TRequestCreateAnswer): Promise<TResponseAnswer> => {
  const { data } = await api({
    url: ENDPOINTS.ANSWERS.CREATE,
    method: "POST",
    data: payload,
  });
  return data;
};
