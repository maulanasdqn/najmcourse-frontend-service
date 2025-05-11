import { userCreateSchema } from "@/shared/apis/users/schema";
import { TUserCreateRequest } from "@/shared/apis/users/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { message } from "antd";
import { useNavigate } from "react-router";
import { usePostCreateUser } from "./use-post-create-user";
import { ROUTES } from "@/shared/commons/constants/routes";

export const useCreateUser = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = usePostCreateUser();

  const form = useForm<TUserCreateRequest>({
    mode: "all",
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      email: "",
      fullname: "",
      is_active: true,
      password: "",
      phone_number: "",
      referral_code: "",
      referred_by: "",
      role_id: "",
      student_type: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        message.success("User created successfully");
        navigate(ROUTES.iam.users.list);
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
