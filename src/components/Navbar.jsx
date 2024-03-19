import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#222222]">
      <nav className="text-white mx-auto  w-[50%] flex justify-between items-center py-[20px]">
        <span>Todo</span>
        <ul className="flex justify-center items-center gap-5">
          <li>
            <button
              className="border-[1px] py-[6px] px-[1rem] rounded-md text-[#999999] border-[#999999] hover:text-white hover:border-white transition-all duration-100"
              onClick={() => navigate("/todo")}
            >
              Get Started
            </button>
          </li>
          <li>
            <button
              className="border-[1px] py-[5px] px-[0.5rem] text-[#999999] border-[#999999] hover:text-white hover:border-white transition-all duration-100"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className="border-[1px] py-[5px] px-[0.5rem] text-[#999999] border-[#999999] hover:text-white hover:border-white transition-all duration-100"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
