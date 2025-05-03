import { updateRoleSchema } from "@/api/roles/schema";
import { TRoleCreateRequest } from "@/api/roles/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePutUpdateRole } from "./use-put-update-role";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { useGetDetailRole } from "../../_hooks/use-get-detail-role";
import { useEffect } from "react";
import { useGetListPermission } from "@/app/(protected)/iam/permissions/list/_hooks/use-get-list-permission";
import { ROUTES } from "@/commons/constants/routes";

export const useUpdateRole = () => {
  const { data: permissions } = useGetListPermission({
    page: 1,
    per_page: 100,
  });
  const params = useParams();
  const navigate = useNavigate();
  const { mutate, isPending } = usePutUpdateRole();
  const { data, isLoading } = useGetDetailRole(params.id ?? "");
  const form = useForm<TRoleCreateRequest>({
    mode: "all",
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.data.name,
        permissions: data.data.permissions.map((permission) => permission.id),
      });
    }
  }, [data, form]);

  const onSubmit = form.handleSubmit((data) => {
    mutate(
      {
        id: params.id ?? "",
        name: data.name,
        permissions: data.permissions,
      },
      {
        onSuccess: () => {
          form.reset();
          message.success("Role updated successfully");
          navigate(ROUTES.iam.roles.list);
        },
      },
    );
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
