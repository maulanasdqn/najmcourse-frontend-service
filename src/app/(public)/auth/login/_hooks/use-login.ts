import { loginSchema } from "@/api/auth/schema";
import { TLoginParam } from "@/api/auth/type";
import { useSession } from "@/app/_components/providers/session";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, theme } from "antd";
import { useForm } from "react-hook-form";

const { useToken } = theme;
const { useBreakpoint } = Grid;

export const useLogin = () => {
  const session = useSession();
  const screens = useBreakpoint();
  const { token } = useToken();

  const styles = {
    section: {
      height: "100vh",
      backgroundColor: token.colorBgLayout,
    },
    illustrationWrapper: {
      backgroundColor: token.colorPrimaryBg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: token.paddingXL,
      height: "100%",
    },
    formWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: screens.md ? `${token.paddingXL}px` : `${token.padding}px`,
      height: "100%",
    },
    container: {
      width: "100%",
      maxWidth: 380,
    },
    header: {
      marginBottom: token.marginXL,
      textAlign: "center" as const,
    },
    text: {
      color: token.colorTextSecondary,
    },
    title: {
      fontSize: screens.md ? token.fontSizeHeading2 : token.fontSizeHeading3,
    },
    footer: {
      marginTop: token.marginLG,
      textAlign: "center" as const,
    },
    row: {
      height: "100%",
      display: "flex",
      alignItems: "center",
    },
  };

  const form = useForm<TLoginParam>({
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
