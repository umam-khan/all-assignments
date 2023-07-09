import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import TodoForm from "./TodoForm";
import EditTodo from "./EditTodo";
import { Card } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => {
      resp.json().then((data) => {
        console.log(data);
        setTodos(data.todos);
      });
    });
  }, []);
  return (
    <>
        <div className="TodoWrapper">
        <h1>Notes App</h1>
          <TodoForm setTodos={setTodos} todos={todos} />
          <br />
          {todos.map((todo) => {
            return (
              <Todo
                title={todo.title}
                description={todo.description}
                id={todo.id}
                key={todo.id}
                setTodos={setTodos}
                todos={todos}
              />
            );
          })}
        </div>
    </>
  );
};
function Todo(props) {
  // Add a delete button here so user can delete a TODO.
  return (
    <div className="Todo">
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <div style={{ color: "black" }}>{props.title}:</div>
        <div style={{ marginLeft:"5px" }}>{props.description}</div>
      </div>
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => {
            deleteTodo(props.id, props.setTodos);
          }}
          style={{margin:"10px"}}
        />
        <EditTodo id={props.id} setTodos={props.setTodos} />
      </div>
    </div>
  );
}
function editTodo(id) {
  fetch("http://localhost:3000/todos", {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      description: description,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    resp.json().then((data) => {
      console.log(data);
    });
  });
}
function deleteTodo(id, setTodos) {
  fetch("http://localhost:3000/todos/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    resp.json().then((data) => {
      console.log(data);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    });
  });
}

export default Todos;
