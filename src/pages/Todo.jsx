import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function Todo() {
  const navigate = useNavigate();
  const [todo,setTodo]=useState({todoName:""})
  const handleLogout = async () => {
    localStorage.clear();
    console.log("done");
    navigate("/login");
  };

  const handleTodo=(e)=>{
    setTodo((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  const addTodo = async () => {
    const response=await fetch("http://localhost:4000/todo",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"

      },
      credentials:"include",
      body
    })
  };
  return (
    <div className="w-screen h-screen bg-[#222222] flex flex-col items-center pt-[100px]">
      <Container maxWidth="md">
        <Typography variant="h1" sx={{ color: "#999999" }}>
          TODO LIST
        </Typography>
        <form>
          <TextField
            variant="outlined"
            label="Add Your todo"
            color="success"
            sx={{ width: "80%" }}
            size="large"
            onChange={}
            value={todo.todoName}
            name="todoName"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AddIcon onClick={addTodo} fontSize="large"></AddIcon>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </form>

        <Box></Box>
      </Container>
    </div>
  );
}
