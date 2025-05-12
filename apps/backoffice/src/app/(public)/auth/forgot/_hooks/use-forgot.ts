import { forgotPasswordSchema } from "@/shared/apis/auth/schema";
import { TForgotPasswordRequest } from "@/shared/apis/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../_hooks/use-auth";
import { usePostForgotPassword } from "@/shared/hooks/auth/use-post-forgot-password";

export const useForgot = () => {
  const { styles, token } = useAuth();

  const { mutate } = usePostForgotPassword();

  const form = useForm<TForgotPasswordRequest>({
    mode: "all",
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data);
  });

  const state = {
    styles,
    token,
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
