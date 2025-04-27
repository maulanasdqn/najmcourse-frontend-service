import { TResponseDetail, TResponseList } from "@/commons/types/response";
import { TRoleItem } from "../roles/type";

export type TUserItem = {
  id: string;
  role: TRoleItem;
  fullname: string;
  email: string;
  avatar: string | null;
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
};

export type TUserCreateRequest = Omit<TUserItem, "id" | "created_at" | "updated_at" | "roles">;

export type TUserUpdateRequest = Omit<TUserItem, "created_at" | "updated_at" | "roles">;

export type TGetUsersParams = {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  search?: string;
};

export type TUserListResponse = TResponseList<TUserItem>;

export type TUserDetailResponse = TResponseDetail<TUserItem>;
