import { z } from "zod";
import { userActivateSchema, userCreateSchema, userUpdateSchema } from "./schema";
import type { TRoleItem } from "../roles/type";
import type { TResponseDetail, TResponseList } from "@/shared/commons/types/response";

export type TUserItem = {
  id: string;
  role: TRoleItem;
  fullname: string;
  email: string;
  avatar?: string | null;
  phone_number: string;
  referred_by: string | null;
  referral_code: string | null;
  student_type: string;
  is_active: boolean;
  is_profile_completed: boolean;
  identity_number: string | null;
  religion: string | null;
  gender: string | null;
  birthdate: string | null;
  updated_at: string;
  created_at: string;
};

export type TUserCreateRequest = z.infer<typeof userCreateSchema>;

export type TUserUpdateRequest = z.infer<typeof userUpdateSchema>;

export type TUserListResponse = TResponseList<TUserItem>;

export type TUserDetailResponse = TResponseDetail<TUserItem>;

export type TUserActivateRequest = z.infer<typeof userActivateSchema>;
