import { TLoginItem, TLoginRequest } from "@/api/auth/type";
import { createContext } from "react";

export enum ESessionStatus {
  Authenticated = "authenticated",
  Authenticating = "authenticating",
  Unauthenticated = "unauthenticated",
}

export type TSessionContext = {
  isLoading: boolean;
  signIn: (payload: TLoginRequest) => void;
  signOut: () => void;
  session?: TLoginItem;
  status?: ESessionStatus;
};

export const SessionContext = createContext<TSessionContext>({
  isLoading: false,
  signIn: () => {},
  signOut: () => {},
  session: undefined,
  status: undefined,
});
