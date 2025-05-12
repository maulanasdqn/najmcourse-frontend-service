import { TRoleCreateRequest } from "@/shared/apis/roles/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/commons/constants/routes";
import { roleCreateSchema } from "@/shared/apis/roles/schema";
import { usePostCreateRole } from "@/shared/hooks/roles/use-post-create-role";

export const useCreateRole = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = usePostCreateRole();

  const form = useForm<TRoleCreateRequest>({
    mode: "all",
    resolver: zodResolver(roleCreateSchema),
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
        navigate(ROUTES.iam.roles.list);
      },
      onError: (err) => void message.error(err?.response?.data?.message),
    });
  });

  const state = {
    isLoading: isPending,
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
