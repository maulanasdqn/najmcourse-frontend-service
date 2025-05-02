import { useContext } from "react";
import { SessionContext } from "../context/session-context";

export const useSession = () => {
  return useContext(SessionContext);
};
