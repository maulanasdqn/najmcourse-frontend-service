import { loginSchema } from "@/api/auth/schema";
import { TLoginParam } from "@/api/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "@/app/_components/providers";
import { useForm } from "react-hook-form";
import { useAuth } from "../../_hooks/use-auth";

export const useLogin = () => {
  const { styles, token } = useAuth();
  const session = useSession();

  const form = useForm<TLoginParam>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    session.signIn(data);
  });

  const state = {
    styles,
    token,
    isLoading: session.isLoading,
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
