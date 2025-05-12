import { verifyEmailSchema } from "@/shared/apis/auth/schema";
import { TVerifyEmailRequest } from "@/shared/apis/auth/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../_hooks/use-auth";
import { usePostVerifyEmail } from "@/shared/hooks/auth/use-post-verify-email";
import { usePostSendOtp } from "@/shared/hooks/auth/use-post-send-otp-request";
import { message } from "antd";
import { useNavigate, useSearchParams } from "react-router";
import { ROUTES } from "@/shared/commons/constants/routes";

export const useVerify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { styles, token } = useAuth();
  const { mutate, isPending } = usePostVerifyEmail();
  const { mutate: resendCode } = usePostSendOtp();

  const form = useForm<TVerifyEmailRequest>({
    mode: "all",
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: String(email),
      otp: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        message.success("Email verified successfully");
        navigate(ROUTES.auth.payment);
      },
      onError: (err) => {
        message.error(err?.response?.data?.message ?? "Email verification failed");
      },
    });
  });

  const onResendCode = () => {
    resendCode(
      {
        email: String(email),
      },
      {
        onSuccess: (res) => {
          message.success(res.message ?? "Email verification code sent successfully");
        },
        onError: (err) => {
          message.error(err?.response?.data?.message ?? "Email verification code sending failed");
        },
      },
    );
  };

  const state = {
    styles,
    token,
    isLoading: isPending,
  };

  const handler = {
    onSubmit,
    onResendCode,
  };

  return {
    form,
    state,
    handler,
  };
};
