import { permissionCreateSchema } from "@/shared/apis/permissions/schema";
import { TPermissionCreateRequest } from "@/shared/apis/permissions/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePostCreatePermission } from "@/shared/hooks/permissions/use-post-create-permission";
import { message } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/commons/constants/routes";

export const useCreatePermission = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = usePostCreatePermission();

  const form = useForm<TPermissionCreateRequest>({
    mode: "all",
    resolver: zodResolver(permissionCreateSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("Permission created successfully");
        navigate(ROUTES.iam.permissions.list);
      },
      onError: (err) => void message.error(err?.response?.data?.message),
    });
  });

  const handler = {
    onSubmit,
  };

  const state = {
    isLoading: isPending,
  };

  return {
    form,
    state,
    handler,
  };
};
