import { roleUpdateSchema } from "@/api/roles/schema";
import { TRoleUpdateRequest } from "@/api/roles/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePutUpdateRole } from "./use-put-update-role";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { useGetDetailRole } from "../../_hooks/use-get-detail-role";
import { useEffect } from "react";
import { ROUTES } from "@/commons/constants/routes";

export const useUpdateRole = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { mutate, isPending } = usePutUpdateRole();
  const { data, isLoading } = useGetDetailRole(params.id ?? "");

  const form = useForm<TRoleUpdateRequest>({
    mode: "all",
    resolver: zodResolver(roleUpdateSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        id: data.data.id,
        name: data.data.name,
        permissions: data.data.permissions.map((permission) => permission.id),
      });
    }
  }, [data?.data, form]);

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("Role updated successfully");
        navigate(ROUTES.iam.roles.list);
      },
      onError: (err) => void message.error(err?.response?.data?.message),
    });
  });

  const state = {
    isLoading: isLoading || isPending,
  };

  const handler = {
    onSubmit,
  };

  return {
    form,
    state,
    handler,
  };
};
