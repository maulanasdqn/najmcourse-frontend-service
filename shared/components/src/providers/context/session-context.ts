import { TLoginItem, TLoginRequest } from "@/shared/apis/auth/type";
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
  signIn: () => {
    // do nothing
  },
  signOut: () => {
    // do nothing
  },
  session: undefined,
  status: undefined,
});
