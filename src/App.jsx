import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  const token = Cookies.get("jwt");

  return (
    <div className=" font-sora">
      <Routes>
        <Route path={"/"} element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route element={<PrivateRoute></PrivateRoute>}>
          <Route path="/todo" element={<Todo></Todo>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
