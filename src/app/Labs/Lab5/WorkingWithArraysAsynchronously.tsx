"use client";

import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle, FaPencilAlt } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import * as client from "./client";

export default function WorkingWithArraysAsynchronously() {
  // State
  const [todos, setTodos] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch todos on component load
  const fetchTodos = async () => {
    try {
      const todos = await client.fetchTodos();
      setTodos(todos);
      setErrorMessage(null); // clear previous errors
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error fetching todos");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Edit todo locally
  const editTodo = (todo: any) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t
    );
    setTodos(updatedTodos);
  };

  // Update todo both locally and on server
  const updateTodo = async (todo: any) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error updating todo");
    }
  };

  // Create a new todo via GET route
  const createNewTodo = async () => {
    try {
      const todos = await client.createNewTodo();
      setTodos(todos);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error creating todo");
    }
  };

  // Create a new todo via POST route
  const postNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
      });
      setTodos([...todos, newTodo]);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error posting todo");
    }
  };

  // Remove todo via backend
  const removeTodo = async (todo: any) => {
    try {
      const updatedTodos = await client.removeTodo(todo);
      setTodos(updatedTodos);
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error removing todo");
    }
  };

  // Delete todo locally + backend
  const deleteTodo = async (todo: any) => {
    try {
      await client.deleteTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id));
      setErrorMessage(null);
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Error deleting todo");
    }
  };

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {/* Error message */}
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>
        Todos{" "}
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
        />{" "}
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem
            key={todo.id}
            className="d-flex align-items-center justify-content-between"
          >
            {/* Left: checkbox + title or editable input */}
            <div className="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                className="form-check-input"
                defaultChecked={todo.completed}
                onChange={(e) =>
                  updateTodo({ ...todo, completed: e.target.checked })
                }
              />
              {!todo.editing ? (
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
              ) : (
                <FormControl
                  className="w-50"
                  defaultValue={todo.title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo({ ...todo, editing: false });
                    }
                  }}
                  onChange={(e) =>
                    updateTodo({ ...todo, title: e.target.value })
                  }
                />
              )}
            </div>

            {/* Right: action buttons */}
            <div className="d-flex gap-2">
              <FaPencilAlt
                onClick={() => editTodo(todo)}
                className="text-primary mt-1"
              />
              {/* The "bad" static way misusing GET for everything */}
              <FaTrash
                onClick={() => removeTodo(todo)}
                className="text-danger mt-1"
                id="wd-remote-todos"
              />

              {/* Deletes the REST way */}
              <TiDelete
                onClick={() => deleteTodo(todo)}
                className="text-danger fs-3"
                id="wd-delete-todos"
              />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}