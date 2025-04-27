import { TResponseDetail, TResponseList } from "@/commons/types/response";
import { TPermissionItem } from "../permissions/type";

export type TRoleItem = {
  id: string;
  name: string;
  permissions: TPermissionItem[];
  created_at: string;
  updated_at: string;
};

export type TRoleCreateRequest = {
  name: string;
  permissions: string[];
};

export type TRoleUpdateRequest = {
  id: string;
  name: string;
  permissions: string[];
};

export type TRoleListResponse = TResponseList<TRoleItem>;

export type TRoleDetailResponse = TResponseDetail<TRoleItem>;
