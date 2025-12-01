import { useContext } from "react";
import { UserContext, UserContextType } from "../contexts/UserContext";

export function useUser(): UserContextType {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return ctx;
}