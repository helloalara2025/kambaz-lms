import { useState } from "react";
import {Button} from "react-bootstrap";

export default function Counter() {
//   let count = 7;
const [count, setCount] = useState(7);
  console.log(count);

  return (
    <div id="wd-counter-use-state">
      <h2>Counter: {count}</h2>
      <Button
      variant="btn btn-success"
        onClick={() =>
            setCount(count + 1)}
        //   count++;
        //   console.log(count);
        id="wd-counter-up-click"
      >
        Up
      </Button>
      <Button
      variant="btn btn-danger"
        onClick={() => setCount(count - 1)}
        //   count--;
        //   console.log(count);
        id="wd-counter-down-click"
      >
        Down
      </Button>
      <hr />
    </div>
  );
}