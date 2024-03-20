import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [authUser, setAuthUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleForm = (e) => {
    setAuthUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(authUser);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authUser),
    });
    console.log(response);
    if (response.ok) {
      const res_data = await response.json();
      localStorage.setItem("jwt", JSON.stringify(res_data.data));
      console.log(res_data);

      navigate("/todo");
      toast.success("Logged In Successfully");
    } else {
      toast.error("wrong credentials", {
        duration: 4000,
      });
      const res_data = await response.json();
      console.log(res_data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#222222]">
      <div className="form-container mb-[120px]">
        <p className="title">Login</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              value={authUser.username}
              onChange={handleForm}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={authUser.password}
              onChange={handleForm}
              placeholder=""
            />
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">
                Forgot Password ?
              </a>
            </div>
          </div>
          <button className="sign">Sign in</button>
        </form>

        <p className="signup mt-[20px]">
          Don't have an account?
          <a rel="noopener noreferrer" href="/signup" className="">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
