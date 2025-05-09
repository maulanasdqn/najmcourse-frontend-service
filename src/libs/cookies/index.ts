import { TTokenItem } from "@/api/auth/type";
import Cookies from "js-cookie";

const TOKEN_KEY = "token";

type TStoredToken =
  | {
      token?: TTokenItem;
    }
  | undefined;

export const SessionToken = {
  set: (val: TStoredToken) => {
    Cookies.set(TOKEN_KEY, JSON.stringify(val), {
      secure: true,
      sameSite: "Strict",
      expires: 7,
    });
  },
  get: (): TStoredToken => {
    const token = Cookies.get(TOKEN_KEY);
    if (!token) return undefined;
    try {
      return JSON.parse(token);
    } catch {
      return undefined;
    }
  },
  remove: () => {
    Cookies.remove(TOKEN_KEY);
  },
};
