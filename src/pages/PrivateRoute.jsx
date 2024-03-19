import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

export default function PrivateRoute() {
  const { isAuth } = useContext(AppContext);
  console.log(isAuth);
  return isAuth ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>;
}
