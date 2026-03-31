import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { RootState } from "../../store/store";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch(); 

  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <Button variant="success"
      onClick={() => dispatch(addTodo(todo))}
      id="wd-add-todo-click"> Add </Button>
      <Button variant="warning"
      onClick={() => dispatch(updateTodo(todo))}
              id="wd-update-todo-click"> Update </Button>
      <FormControl value={todo.title}
        onChange={ (e) => dispatch(setTodo({ ...todo, title: e.target.value })) }/>
    </ListGroupItem>
);}

