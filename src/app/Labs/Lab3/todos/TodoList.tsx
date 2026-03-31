import TodoItem from "./TodoItem";
import todos from "./todos.json";
import { ListGroup } from "react-bootstrap";
export default function TodoList() {
 return(
   <>
     <h3>Todo List</h3>
     <ListGroup>
       { todos.map((todos, index) => {
           return(<TodoItem todo={todos}  key={index}/>);   })}
     </ListGroup><hr/>
   </>
);}

