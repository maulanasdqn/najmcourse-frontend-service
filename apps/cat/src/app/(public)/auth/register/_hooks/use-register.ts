import { registerSchema } from "@/shared/apis/auth/schema";
import { TRegisterRequest } from "@/shared/apis/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { usePostRegister } from "@/shared/hooks/auth/use-post-register";
import { useAuth } from "../../_hooks/use-auth";
import { message } from "antd";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/commons/constants/routes";

export const useRegister = () => {
  const navigate = useNavigate();
  const { styles, token } = useAuth();
  const { mutate, isPending } = usePostRegister();

  const form = useForm<TRegisterRequest>({
    mode: "all",
    resolver: zodResolver(registerSchema),
  });

  console.log(form.formState.errors);

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: (res) => {
        message.success(res.message ?? "Account created successfully");
        navigate(`${ROUTES.auth.verify}?email=${data.email}`);
      },
      onError: (err) => {
        message.error(err?.response?.data?.message ?? "Account creation failed");
      },
    });
  });

  const state = {
    styles,
    token,
    isLoading: isPending,
  };

  const handler = {
    onSubmit,
  };

  const options = {
    refferedBy: [
      {
        label: "Peserta",
        value: "student",
      },
      {
        label: "Guru",
        value: "teacher",
      },
      {
        label: "Teman",
        value: "friend",
      },
      {
        label: "Sosial Media",
        value: "social_media",
      },
      {
        label: "Lainya",
        value: "other",
      },
    ],
  };

  return {
    form,
    state,
    options,
    handler,
  };
};
