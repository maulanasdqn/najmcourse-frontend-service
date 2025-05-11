import { AxiosError } from "axios";
import { TMetaResponse } from "./meta";

export type TResponseList<T> = {
  data: T[];
  meta: TMetaResponse;
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
