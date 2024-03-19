import React from "react";
import Navbar from "../components/Navbar";
import { ReactTyped } from "react-typed";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#222222]">
      <Navbar></Navbar>
      <div className="mx-auto w-[50%] flex flex-col items-center">
        <p className="text-white/60 font-[300] text-center py-[25%] flex flex-col items-center text-[43px] ">
          Welcome To This React Todo Application
          <div>
            <ReactTyped
              strings={["Keep Your Work Organised", "Simple To Use"]}
              typeSpeed={100}
              backSpeed={70}
              backDelay={2}
              loop
            ></ReactTyped>
          </div>
        </p>
        <button className="border-[1px]  py-[6px] px-[1rem] rounded-md text-[#999999] border-[#999999] hover:text-white hover:border-white transition-all duration-100">
          Get Started
        </button>
      </div>
    </div>
  );
}
