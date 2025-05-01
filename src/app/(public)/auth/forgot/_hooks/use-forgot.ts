import { forgotPasswordSchema } from "@/api/auth/schema";
import { TForgotPasswordParam } from "@/api/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../_hooks/use-auth";
import { usePostForgot } from "./use-post-forgot";

export const useForgot = () => {
  const { styles, token } = useAuth();

  const { mutate } = usePostForgot();

  const form = useForm<TForgotPasswordParam>({
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
