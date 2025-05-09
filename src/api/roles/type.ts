import { z } from "zod";
import { roleCreateSchema, roleUpdateSchema } from "./schema";
import type { TResponseDetail, TResponseList } from "@/commons/types/response";
import type { TPermissionItem } from "../permissions/type";

export type TRoleItem = {
  id: string;
  name: string;
  permissions: TPermissionItem[];
  created_at: string;
  updated_at: string;
};

export type TRoleListResponse = TResponseList<TRoleItem>;

export type TRoleDetailResponse = TResponseDetail<TRoleItem>;

export type TRoleCreateRequest = z.infer<typeof roleCreateSchema>;

export type TRoleUpdateRequest = z.infer<typeof roleUpdateSchema>;
