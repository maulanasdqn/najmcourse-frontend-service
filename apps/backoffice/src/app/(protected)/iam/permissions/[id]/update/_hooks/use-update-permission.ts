import { permissionUpdateSchema } from "@/shared/apis/permissions/schema";
import { TPermissionUpdateRequest } from "@/shared/apis/permissions/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePutUpdatePermission } from "./use-put-update-permission";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { useGetDetailPermission } from "../../_hooks/use-get-detail-permissions";
import { useEffect } from "react";
import { ROUTES } from "@/shared/commons/constants/routes";

export const useUpdatePermission = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { mutate, isPending } = usePutUpdatePermission();
  const { data, isLoading } = useGetDetailPermission(params.id);

  const form = useForm<TPermissionUpdateRequest>({
    mode: "all",
    resolver: zodResolver(permissionUpdateSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset(data.data);
    }
  }, [data?.data, form]);

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("Permission updated successfully");
        navigate(ROUTES.iam.permissions.list);
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
