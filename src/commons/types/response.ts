import { AxiosError } from "axios";

export type TResponseList<T> = {
  data: T[];
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_page: number;
  };
  version: string;
};

export type TResponseDetail<T> = {
  data: T;
  version: string;
};

export type TMessageResponse = {
  message: string;
  version: string;
};

export type TResponseError = AxiosError<TMessageResponse>;
