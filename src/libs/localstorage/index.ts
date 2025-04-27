import { TUserItem } from "@/api/users/type";

export const SessionUser = {
  set: (val: { user: TUserItem }) => localStorage.setItem("users", JSON.stringify(val)),

  get: (): { user: TUserItem } | undefined => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : undefined;
  },

  remove: () => localStorage.removeItem("users"),
};
