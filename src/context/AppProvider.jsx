import { createContext } from "react";
import Cookies from "js-cookie";
import { useState } from "react";
import { useEffect } from "react";

export const AppContext = createContext();

export default function AppProviderData({ children }) {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem("jwt")));
  console.log(isAuth);

  // useEffect(() => {
  //   setIsAuth(JSON.parse(localStorage.getItem("jwt")));
  //   console.log(isAuth);
  // }, [isAuth]);

  const value = {
    isAuth,
    setIsAuth,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
