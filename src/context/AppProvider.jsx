import { createContext } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";

export const AppContext = createContext();

export default function AppProviderData({ children }) {
  const [isAuth, setIsAuth] = useState("");
  const token = Cookies.get("jwt");
  useEffect(() => {
    setIsAuth(token);
  });

  const value = {
    isAuth,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
