import { api } from "@/libs/axios/api";
import { ENDPOINTS } from "@/commons/constants/endpoints";
import type { TMessageResponse } from "@/commons/types/response";
import type {
  TLoginRequest,
  TSendOtpRequest,
  TRegisterRequest,
  TVerifyEmailRequest,
  TNewPasswordRequest,
  TForgotPasswordRequest,
  TLoginResponse,
  TRefreshTokenResponse,
} from "./type";

export const postLogin = async (payload: TLoginRequest): Promise<TLoginResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.LOGIN,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postRegister = async (payload: TRegisterRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.REGISTER,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postForgotPassword = async (
  payload: TForgotPasswordRequest,
): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.FORGOT_PASSWORD,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postNewPassword = async (payload: TNewPasswordRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.NEW_PASSWORD,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postSendOtp = async (payload: TSendOtpRequest): Promise<TMessageResponse> => {
  const { data } = await api({
    url: ENDPOINTS.AUTH.SEND_OTP,
    method: "POST",
    data: payload,
  });
  return data;
};

export const postVerifyEmail = async (payload: TVerifyEmailRequest): Promise<TMessageResponse> => {
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
