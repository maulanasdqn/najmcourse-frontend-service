import { TPermissionCreateRequest, TPermissionUpdateRequest } from "@/api/permissions/type";
import { useFormContext } from "react-hook-form";

export const useFormPermission = () => {
  const form = useFormContext<TPermissionCreateRequest | TPermissionUpdateRequest>();
  return {
    form,
  };
};
