import { z } from "zod";
import {
  forgotPasswordSchema,
  loginSchema,
  newPasswordSchema,
  registerSchema,
  sendOtpSchema,
  verifyEmailSchema,
} from "./schema";
import type { TUserItem } from "../users/type";
import type { TResponseDetail } from "@/commons/types/response";

export type TTokenItem = {
  access_token: string;
  refresh_token: string;
};

export type TLoginItem = {
  token?: TTokenItem;
  user?: TUserItem;
};

export type TRefreshTokenResponse = TResponseDetail<TTokenItem>;

export type TLoginResponse = TResponseDetail<TLoginItem>;

export type TLoginRequest = z.infer<typeof loginSchema>;

export type TRegisterRequest = z.infer<typeof registerSchema>;

export type TForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>;

export type TNewPasswordRequest = z.infer<typeof newPasswordSchema>;

export type TSendOtpRequest = z.infer<typeof sendOtpSchema>;

export type TVerifyEmailRequest = z.infer<typeof verifyEmailSchema>;
