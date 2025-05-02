import { updateRoleSchema } from "@/api/roles/schema";
import { TRoleCreateRequest } from "@/api/roles/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { useNavigate } from "react-router";
import { useGetListPermission } from "@/app/(protected)/iam/permissions/list/_hooks/use-get-list-permission";
import { usePostCreateRole } from "./use-post-create-role";

export const useCreateRole = () => {
  const { data: permissions, isLoading } = useGetListPermission({
    page: 1,
    per_page: 100,
  });
  const navigate = useNavigate();
  const { mutate, isPending } = usePostCreateRole();
  const form = useForm<TRoleCreateRequest>({
    mode: "all",
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("Role created successfully");
        navigate("/iam/roles/list");
      },
    });
  });

  const state = {
    isLoading: isLoading || isPending,
  };

  const options = {
    permissions: permissions?.data.map((permission) => ({
      label: permission.name,
      value: permission.id,
    })),
  };

  const handler = {
    onSubmit,
  };

  return {
    form,
    state,
    handler,
    options,
  };
};
