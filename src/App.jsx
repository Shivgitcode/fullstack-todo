import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/todo");
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div className=" font-sora">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/todo" element={<Todo></Todo>}></Route>
      </Routes>
    </div>
  );
}

export default App;
