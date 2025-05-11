import type { TLoginItem, TLoginRequest } from "@/shared/apis/auth/type";
import {
  useEffect,
  useState,
  FC,
  useMemo,
  useCallback,
  ReactElement,
  PropsWithChildren,
} from "react";
import { SessionContext, ESessionStatus } from "./context/session-context";
import { Outlet, useNavigate } from "react-router";
import { SessionToken } from "@/shared/libs/cookies";
import { usePostLogin } from "./hooks/use-post-login";
import { SessionUser } from "@/shared/libs/localstorage";
import { message } from "antd";
import { ROUTES } from "@/shared/commons/constants/routes";

export const SessionProvider: FC<PropsWithChildren> = (props): ReactElement => {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState<TLoginItem | undefined>(undefined);
  const [status, setStatus] = useState<ESessionStatus>();
  const { mutate, isPending } = usePostLogin();

  useEffect(() => {
    const session = SessionToken.get();
    const user = SessionUser.get();
    if (session) {
      setSessionData({ ...session, ...user });
      setStatus(ESessionStatus.Authenticated);
    } else {
      setStatus(ESessionStatus.Unauthenticated);
    }
  }, []);

  const signIn = useCallback(
    (payload: TLoginRequest) => {
      setStatus(ESessionStatus.Authenticating);
      mutate(payload, {
        onSuccess: (res) => {
          if (res.data.user?.role.name?.toLowerCase() === "student") {
            message.error("Student are not allowed to access this page");
            setStatus(ESessionStatus.Unauthenticated);
            return;
          }
          setSessionData(res.data);
          setStatus(ESessionStatus.Authenticated);
          SessionUser.set({
            user: res.data.user,
          });
          SessionToken.set({
            token: res?.data?.token,
          });
          message.success("Login Successful");
          navigate(0);
        },
        onError: (err) => {
          message.error(err?.response?.data?.message ?? "Login Failed");
          setStatus(ESessionStatus.Unauthenticated);
        },
      });
    },
    [mutate, navigate],
  );

  const signOut = useCallback(() => {
    setStatus(ESessionStatus.Unauthenticated);
    setSessionData(undefined);
    SessionUser.remove();
    SessionToken.remove();
    navigate(ROUTES.auth.login);
  }, [navigate]);

  const contextValue = useMemo(
    () => ({ session: sessionData, status, signIn, signOut, isLoading: isPending }),
    [sessionData, status, signIn, signOut, isPending],
  );

  return (
    <SessionContext.Provider value={contextValue}>
      <Outlet />
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
