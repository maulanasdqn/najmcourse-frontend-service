import { TRoleCreateRequest, TRoleUpdateRequest } from "@/api/roles/type";
import { useFormContext } from "react-hook-form";
import { useGetListPermission } from "../../permissions/list/_hooks/use-get-list-permission";

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
