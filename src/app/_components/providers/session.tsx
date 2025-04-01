import { TLoginOidcParam } from "@/api/auth/type";
import { useEffect, useState, createContext, useContext } from "react";
import { createClient, type Provider } from "@supabase/supabase-js";
import { SessionUser } from "@/libs/localstorage";
import { SessionToken } from "@/libs/cookies";
import { usePostLoginOidc } from "@/app/(public)/auth/oauth-callback/_hooks/use-post-login-oidc";
import { useNavigate } from "react-router";
import { TUserItem } from "@/api/user/type";
import { PERMISSIONS } from "@/commons/constants/permissions";

type Session = {
  signin: (payload: TLoginOidcParam) => void;
  signinWithOAuth: (provider: Provider) => void;
  signout: () => void;
  session?: {
    access_token: string;
    refresh_token: string;
    user?: TUserItem;
  };
  status?: "authenticated" | "authenticating" | "unauthenticated";
  supabase: typeof supabase;
};

const supabase = createClient(
  import.meta.env.VITE_AUTH_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_AUTH_SUPABASE_PUBLIC_KEY,
);
const SessionContext = createContext<Session>({
  signinWithOAuth: () => {},
  signout: () => {},
  signin: () => {},
  session: undefined,
  status: undefined,
  supabase,
});

const SessionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [sessionData, setSessionData] = useState<Session["session"]>();
  const [status, setStatus] = useState<Session["status"]>();

  const { mutate: oidcMutate } = usePostLoginOidc();

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
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) return;
      const user: TUserItem = {
        id: session?.user.id,
        name: session?.user.user_metadata.name || session?.user.email,
        email: session?.user.email,
        created_at: session?.user.created_at,
        updated_at: session?.user.updated_at || new Date().toISOString(),
        roles: [
          {
            id: "1",
            key: "user",
            name: "User",
            permissions: [
              {
                id: "1",
                key: PERMISSIONS.MOVIES.READ_MOVIES,
                name: PERMISSIONS.MOVIES.READ_MOVIES,
              },
              {
                id: "2",
                key: PERMISSIONS.FAVOURITES.READ_FAVOURITES,
                name: PERMISSIONS.FAVOURITES.READ_FAVOURITES,
              },
              {
                id: "3",
                key: PERMISSIONS.FAVOURITES.CREATE_FAVOURITES,
                name: PERMISSIONS.FAVOURITES.CREATE_FAVOURITES,
              },
              {
                id: "4",
                key: PERMISSIONS.FAVOURITES.DELETE_FAVOURITES,
                name: PERMISSIONS.FAVOURITES.DELETE_FAVOURITES,
              },
            ],
          },
        ],
      };

      setSessionData({
        access_token: session?.access_token,
        refresh_token: session?.refresh_token,
        user,
      });

      setStatus("authenticated");

      SessionUser.set({ user });

      setTimeout(() => {
        navigate("/dashboard");
      }, 600);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const signinWithOAuth = async (provider: Provider) => {
    setStatus("authenticating");

    supabase.auth
      .signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + "/oauth-callback",
        },
      })
      .catch(() => {
        setStatus("unauthenticated");
      });
  };
  const signin = (payload: TLoginOidcParam) => {
    setStatus("authenticating");
    oidcMutate(payload, {
      onSuccess: (res) => {
        setSessionData(res.data);

        setStatus("authenticated");

        SessionUser.set(res.data);

        setTimeout(() => {
          navigate("/dashboard");
        }, 600);
      },
      onError: () => {
        setStatus("unauthenticated");
      },
    });
  };
  const signout = async () => {
    await supabase.auth.signOut();
    setStatus("unauthenticated");
    setSessionData(undefined);
    SessionUser.remove();
    SessionToken.remove();
    navigate("/auth/login");
  };

  return (
    <SessionContext.Provider
      value={{
        session: sessionData,
        status,
        signin,
        signout,
        supabase,
        signinWithOAuth,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};

export default SessionProvider;
