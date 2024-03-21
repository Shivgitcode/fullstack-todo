import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect } from "react";

export default function Todo() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({ todoName: "", isDone: false });
  const [allTodos, setAllTodos] = useState([]);
  const handleLogout = async () => {
    localStorage.clear();
    console.log("done");
    navigate("/login");

    toast.success("logged out successfully");
  };

  const handleTodo = (e) => {
    setTodo((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name === "isDone" ? e.target.checked : e.target.value,
      };
    });
    console.log(todo);
  };
  const addTodo = async () => {
    const response = await fetch("http://localhost:4000/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(todo),
    });
    console.log(response);
    if (response.ok) {
      const res_data = await response.json();
      console.log(res_data);
      setTodo((prev) => {
        return { ...prev, todoName: "" };
      });
    } else {
      toast.error("some internal server error occurred", {
        duration,
      });
    }
  };
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("http://localhost:4000/todo", {
        method: "GET",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data);
        setAllTodos(res_data.data);
      } else {
        const res_data = await response.json();
        console.log(res_data);
      }
    };
    fetchTodos();
  }, [todo]);

  const deleteTodo = async (id) => {
    const response = await fetch(`http://localhost:4000/todo/${id}`, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      const res_data = await response.json();
      console.log(res_data);
      setTodo([]);
    }
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
            onChange={handleTodo}
            value={todo.todoName}
            name="todoName"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AddIcon
                    onClick={addTodo}
                    className=" cursor-pointer"
                    fontSize="large"
                  ></AddIcon>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </form>

        <Box>
          <List>
            {allTodos.map((el) => {
              return (
                <ListItem
                  key={el._id}
                  onClick={() => deleteTodo(el._id)}
                  secondaryAction={
                    <IconButton edge="end">
                      <DeleteIcon sx={{ fill: "white" }}></DeleteIcon>
                    </IconButton>
                  }
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <Checkbox
                        key={0}
                        edge="start"
                        checked={el.isDone}
                        onChange={handleTodo}
                        name="isDone"
                        disableRipple
                      ></Checkbox>
                    </ListItemIcon>
                    <ListItemText
                      primary={el.todoName}
                      sx={{ color: "white" }}
                    ></ListItemText>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Container>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
