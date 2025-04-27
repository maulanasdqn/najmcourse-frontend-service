import { TUserItem } from "../users/type";

export type TLoginParam = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  data: {
    token: {
      access_token: string;
      refresh_token: string;
    };
    user: TUserItem;
  };
  version: string;
};

export type TRegisterParam = {
  email: string;
  fullname: string;
  password: string;
  phone_number: string;
  student_type: string;
  referral_code?: string | null;
  referred_by?: string | null;
};

export type TRegisterResponse = {
  data: {
    token: {
      access_token: string;
      refresh_token: string;
    };
    user: TUserItem;
  };
  version: string;
};

export type TForgotPasswordParam = {
  email: string;
};

export type TNewPasswordParam = {
  email: string;
  otp: string;
  password: string;
};

export type TSendOtpParam = {
  email: string;
};

export type TVerifyEmailParam = {
  email: string;
  otp: string;
};

export type TRefreshTokenResponse = {
  data: {
    access_token: string;
    refresh_token: string;
  };
  version: string;
};
