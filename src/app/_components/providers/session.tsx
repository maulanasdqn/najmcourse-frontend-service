import { TLoginParam } from "@/api/auth/type";
import {
  useEffect,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
  FC,
  useMemo,
  useCallback,
} from "react";
import { SessionUser } from "@/libs/localstorage";
import { SessionToken } from "@/libs/cookies";
import { useNavigate } from "react-router";
import { TUserItem } from "@/api/users/type";
import { usePostLogin } from "@/app/(public)/auth/login/_hooks/use-post-login";

type Session = {
  signIn: (payload: TLoginParam) => void;
  signOut: () => void;
  session?: {
    token: {
      access_token: string;
      refresh_token: string;
    };
    user?: TUserItem;
  };
  status?: "authenticated" | "authenticating" | "unauthenticated";
};

const SessionContext = createContext<Session>({
  signIn: () => {},
  signOut: () => {},
  session: undefined,
  status: undefined,
});

const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState<Session["session"]>();
  const [status, setStatus] = useState<Session["status"]>();

  const { mutate } = usePostLogin();

  useEffect(() => {
    console.log("Executing useEffect");
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
          SessionUser.set(res.data);
          SessionToken.set(res.data);
          setTimeout(() => {
            navigate("/dashboard");
          }, 600);
        },
        onError: () => {
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
    () => ({ session: sessionData, status, signIn, signOut }),
    [sessionData, status, signIn, signOut],
  );

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  return useContext(SessionContext);
};

export default SessionProvider;
