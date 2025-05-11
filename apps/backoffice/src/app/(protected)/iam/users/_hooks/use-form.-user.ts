import { TUserCreateRequest, TUserUpdateRequest } from "@/shared/apis/users/type";
import { useGetListRole } from "../../roles/list/_hooks/use-get-list-role";
import { useFormContext } from "react-hook-form";
import { studentTypes } from "../../../_constants/options";

export const useFormUser = () => {
  const form = useFormContext<TUserCreateRequest | TUserUpdateRequest>();

  const { data: roles } = useGetListRole({
    page: 1,
    per_page: 100,
  });

  const options = {
    roles: roles?.data.map((role) => ({
      label: role.name,
      value: role.id,
    })),
    studentTypes,
  };

  return {
    form,
    options,
  };
};
