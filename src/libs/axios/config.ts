import { AxiosRequestConfig } from "axios";
import { SessionToken } from "../cookies";
import { env } from "../env";

export const axiosConfig: AxiosRequestConfig = {
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${SessionToken.get()?.token?.access_token}`,
  },
};
