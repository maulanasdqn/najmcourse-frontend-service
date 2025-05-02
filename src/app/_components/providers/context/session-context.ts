import { TLoginParam } from "@/api/auth/type";
import { TUserItem } from "@/api/users/type";
import { createContext } from "react";

export type Session = {
  isLoading: boolean;
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

export const SessionContext = createContext<Session>({
  isLoading: false,
  signIn: () => {},
  signOut: () => {},
  session: undefined,
  status: undefined,
});
