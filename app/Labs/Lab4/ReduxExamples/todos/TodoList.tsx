"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr/>
    </div>
  );
}