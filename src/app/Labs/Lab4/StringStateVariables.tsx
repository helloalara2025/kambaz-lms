import { useState } from "react"; // import useState
import { FormControl } from "react-bootstrap";

export default function StringStateVariables() {
  const [firstName, setFirstName] = useState("Ella Pitts"); // declare, initialize, state variable
  return (
    <div>
      <h2>String State Variables</h2>
      <p>{firstName}</p>
      <FormControl
        defaultValue={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <hr />
    </div>
  );
}
