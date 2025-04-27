import { api } from "@/libs/axios/api";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import {
  TLoginParam,
  TLoginResponse,
  TRegisterParam,
  TRegisterResponse,
  TForgotPasswordParam,
  TNewPasswordParam,
  TSendOtpParam,
  TVerifyEmailParam,
  TRefreshTokenResponse,
} from "./type";
import { TMessageResponse } from "@/commons/types/response";

export const postLogin = async (payload: TLoginParam): Promise<TLoginResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.LOGIN,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postRegister = async (payload: TRegisterParam): Promise<TRegisterResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.REGISTER,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postForgotPassword = async (
  payload: TForgotPasswordParam,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.FORGOT_PASSWORD,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postNewPassword = async (payload: TNewPasswordParam): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.NEW_PASSWORD,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postSendOtp = async (payload: TSendOtpParam): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.SEND_OTP,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postVerifyEmail = async (payload: TVerifyEmailParam): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.VERIFY_EMAIL,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postRefreshToken = async (): Promise<TRefreshTokenResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.REFRESH_TOKEN,
    method: "POST",
  });
  return data;
};
