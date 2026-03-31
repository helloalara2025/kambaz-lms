import {Button} from "react-bootstrap";

export default function ChildStateComponent({
  counter,
  setCounter,
}: {
  counter: number;
  setCounter: (counter: number) => void;
}) {
  return (
    <div id="wd-child-state">
      <Button
      variant="btn btn-success"
        onClick={() => setCounter(counter + 1)}
        id="wd-increment-child-state-click"
      >
        Increment
      </Button>
      <Button
      variant="btn btn-danger"
        onClick={() => setCounter(counter - 1)}
        id="wd-decrement-child-state-click"
      >
        Decrement
      </Button>
    </div>
  );
}
