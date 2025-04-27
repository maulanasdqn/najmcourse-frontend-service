import { TResponseDetail, TResponseList } from "@/commons/types/response";

export type TPermissionItem = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type TPermissionCreateRequest = {
  name: string;
};

export type TPermissionUpdateRequest = {
  id: string;
  name: string;
};

export type TPermissionListResponse = TResponseList<TPermissionItem>;

export type TPermissionDetailResponse = TResponseDetail<TPermissionItem>;
