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
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

export default function Todo() {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({ todoName: "" });
  const [allTodos, setAllTodos] = useState([]);
  const { setIsAuth } = useContext(AppContext);
  const handleLogout = async () => {
    localStorage.clear();
    console.log("done");
    setIsAuth(JSON.parse(localStorage.getItem("jwt")));
    navigate("/login");

    toast.success("logged out successfully");
  };

  const handleTodo = async (e) => {
    setTodo((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log("inside handleTodo", todo);

    // const response = await fetch(`http://localhost:4000/todo/${id}`, {
    //   method: "Post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    //   mode: "cors",
    //   body: JSON.stringify(),
    // });

    // if(response.ok){
    //   toast.success("todo updated")

    // }
    // else{
    //   toast.error("some error occured")
  };

  const handleCheck = async (id) => {
    // console.log(allTodos);
    setAllTodos((prev) => {
      return prev.map((el) => {
        if (el._id === id) {
          return { ...el, isDone: true };
        } else {
          return { ...el, isDone: false };
        }
      });
    });
    console.log("inside handleCheck", allTodos);
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
        console.log("this is response data", res_data);
        setAllTodos(res_data.data);
      } else {
        const res_data = await response.json();
        console.log(res_data);
      }
    };
    fetchTodos();
  }, [todo]);

  const deleteTodo = async (id) => {
    setAllTodos((prev) => {
      return prev.filter((el) => {
        if (el._id !== id) {
          return el;
        }
      });
    });

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
                  secondaryAction={
                    <IconButton edge="end" onClick={() => deleteTodo(el._id)}>
                      <DeleteIcon sx={{ fill: "white" }}></DeleteIcon>
                    </IconButton>
                  }
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <Checkbox
                        key={el._id}
                        edge="start"
                        checked={todo.isDone}
                        onChange={() => handleCheck(el._id)}
                        name="isDone"
                        disableRipple={true}
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
