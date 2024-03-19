import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
export default function Login() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("jwt");
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      credentials: "same-origin",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });

    if (response.ok) {
      const res_data = await response.json();
      toast.success("Successfully registered");

      console.log(res_data);
      setUser({ username: "", email: "", password: "" });
      navigate("/login");
    } else {
      <div></div>;
    }
  };

  const handleForm = async (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#222222]">
      <div className="form-container mb-[120px]">
        <p className="title">Register</p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder=""
              value={user.username}
              onChange={handleForm}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder=""
              value={user.email}
              onChange={handleForm}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "password" : "text"}
                name="password"
                id="password"
                placeholder=""
                onChange={handleForm}
                value={user.password}
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-[15px] top-[15px] cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye fontSize={15}></FaRegEye>
                ) : (
                  <FaRegEyeSlash fontSize={15}></FaRegEyeSlash>
                )}
              </div>
            </div>

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
          <a rel="noopener noreferrer" href="#" className="">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
