import { updatePermissionSchema } from "@/api/permissions/schema";
import { TPermissionCreateRequest } from "@/api/permissions/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePutUpdatePermission } from "./use-put-update-permission";
import { message } from "antd";
import { useNavigate, useParams } from "react-router";
import { useGetDetailPermission } from "../../_hooks/use-get-detail-permissions";
import { useEffect } from "react";

export const useUpdatePermission = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { mutate, isPending } = usePutUpdatePermission();
  const { data, isLoading } = useGetDetailPermission(params.id ?? "");
  const form = useForm<TPermissionCreateRequest>({
    mode: "all",
    resolver: zodResolver(updatePermissionSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.data.name,
      });
    }
  }, [data, form]);

  const onSubmit = form.handleSubmit((data) => {
    mutate(
      {
        id: params.id ?? "",
        name: data.name,
      },
      {
        onSuccess: () => {
          form.reset();
          message.success("Permission updated successfully");
          navigate("/iam/permissions/list");
        },
      },
    );
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
