"use client";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, ListGroupItem } from "react-bootstrap";

export default function TodoItem({ todo }: any) {
  const dispatch = useDispatch();

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <span>{todo.title}</span>
      <div>
        <Button 
          variant="primary"  // ✅ Blue (Edit)
          onClick={() => dispatch(setTodo(todo))} 
          id="wd-set-todo-click"
          className="me-2"
        >
          Edit
        </Button>
        <Button 
          variant="danger"  // ✅ Red (Delete)
          onClick={() => dispatch(deleteTodo(todo.id))} 
          id="wd-delete-todo-click"
        >
          Delete
        </Button>
      </div>
    </ListGroupItem>
  );
}