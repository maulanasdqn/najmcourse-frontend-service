import { createPermissionSchema } from "@/api/permissions/schema";
import { TPermissionCreateRequest } from "@/api/permissions/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePostCreatePermission } from "./use-post-create-permission";
import { message } from "antd";
import { useNavigate } from "react-router";

export const useCreatePermission = () => {
  const navigate = useNavigate();
  const { mutate } = usePostCreatePermission();
  const form = useForm<TPermissionCreateRequest>({
    mode: "all",
    resolver: zodResolver(createPermissionSchema),
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("Permission created successfully");
        navigate("/iam/permissions/list");
      },
    });
  });

  const handler = {
    onSubmit,
  };

  return {
    form,
    handler,
  };
};
