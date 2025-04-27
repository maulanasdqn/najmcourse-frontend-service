export const SessionToken = {
  set: (val: { token: { access_token: string; refresh_token: string } }) => {
    localStorage.setItem("token", JSON.stringify(val));
  },
  get: (): { token: { access_token: string; refresh_token: string } } | undefined => {
    const token = localStorage.getItem("token");
    if (!token) return undefined;
    try {
      return JSON.parse(token);
    } catch {
      return undefined;
    }
  },
  remove: () => {
    localStorage.removeItem("token");
  },
};
