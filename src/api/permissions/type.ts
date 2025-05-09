import { z } from "zod";
import { permissionCreateSchema, permissionUpdateSchema } from "./schema";
import type { TResponseDetail, TResponseList } from "@/commons/types/response";

export type TPermissionItem = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

export type TPermissionCreateRequest = z.infer<typeof permissionCreateSchema>;

export type TPermissionUpdateRequest = z.infer<typeof permissionUpdateSchema>;

export type TPermissionListResponse = TResponseList<TPermissionItem>;

export type TPermissionDetailResponse = TResponseDetail<TPermissionItem>;
