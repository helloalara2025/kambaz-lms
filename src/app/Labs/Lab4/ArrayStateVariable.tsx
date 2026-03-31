import { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export default function ArrayStateVariable() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <Button variant="btn btn-success" onClick={addElement} className="mb-3">
        Add Element
      </Button>
      {/* button calls addElement to append to array iterate over array items*/}
      <ul className="list-unstyled">
        {array.map((item, index /* render item's value */) => (
          <li key={index} className="list-group-items">
            {item}
            <Button
              variant="btn btn-danger"
              onClick={() => deleteElement(index)}
              className="ms-3"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <hr />

      {/* New section added to display the todos */ }
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>
            {todo.title}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
