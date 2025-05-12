import { TRoleCreateRequest, TRoleUpdateRequest } from "@/shared/apis/roles/type";
import { useGetListPermission } from "@/shared/hooks/permissions/use-get-list-permission";
import { useFormContext } from "react-hook-form";

export const useFormRole = () => {
  const form = useFormContext<TRoleCreateRequest | TRoleUpdateRequest>();

  const { data: permissions } = useGetListPermission({
    page: 1,
    per_page: 100,
  });

  const options = {
    permissions: permissions?.data.map((permission) => ({
      label: permission.name,
      value: permission.id,
    })),
  };

  return {
    form,
    options,
  };
};
