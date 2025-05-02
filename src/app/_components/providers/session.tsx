import { TLoginParam } from "@/api/auth/type";
import { useEffect, useState, FC, useMemo, useCallback, ReactElement } from "react";
import { SessionUser } from "@/libs/localstorage";
import { SessionToken } from "@/libs/cookies";
import { Outlet, useNavigate } from "react-router";
import { usePostLogin } from "@/app/(public)/auth/login/_hooks/use-post-login";
import { Session, SessionContext } from "./context/session-context";
import { message } from "antd";

const SessionProvider: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState<Session["session"]>();
  const [status, setStatus] = useState<Session["status"]>();

  const { mutate, isPending } = usePostLogin();

  useEffect(() => {
    const session = SessionToken.get();
    const user = SessionUser.get();
    if (session) {
      setSessionData({ ...session, ...user });
      setStatus("authenticated");
    } else {
      setStatus("unauthenticated");
    }
  }, []);

  const signIn = useCallback(
    (payload: TLoginParam) => {
      setStatus("authenticating");
      mutate(payload, {
        onSuccess: (res) => {
          setSessionData(res.data);
          setStatus("authenticated");
          SessionUser.set({
            user: res.data.user,
          });
          SessionToken.set({
            token: {
              access_token: res.data.token.access_token,
              refresh_token: res.data.token.refresh_token,
            },
          });
          message.success("Login Successful");
          navigate(0);
        },
        onError: (err) => {
          message.error(err?.response?.data?.message ?? "Login Failed");
          setStatus("unauthenticated");
        },
      });
    },
    [mutate, navigate],
  );

  const signOut = useCallback(() => {
    setStatus("unauthenticated");
    setSessionData(undefined);
    SessionUser.remove();
    SessionToken.remove();
    navigate("/auth/login");
  }, [navigate]);

  const contextValue = useMemo(
    () => ({ session: sessionData, status, signIn, signOut, isLoading: isPending }),
    [sessionData, status, signIn, signOut, isPending],
  );

  return (
    <SessionContext.Provider value={contextValue}>
      <Outlet />
    </SessionContext.Provider>
  );
};

export default SessionProvider;
