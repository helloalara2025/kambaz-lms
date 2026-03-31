import { useState } from "react";
import { FormControl } from "react-bootstrap";
export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Peter", age: 24 }); // declare and initialize object state variable w/ mutli fields
  return (
    <div>
      <h2>Object State Variables</h2>
      <pre>{JSON.stringify(person, null, 2)}</pre>. {/* display raw JSON */}
      <FormControl
        defaultValue={person.name}
        onChange={(e) => setPerson({ ...person, name: e.target.value })} /* Update field as user types*/
      />
      <FormControl
        defaultValue={person.age}
        type="number"
        onChange={(e) =>
          setPerson({ ...person, age: parseInt(e.target.value) })
        }
      />
      <hr />
    </div>
  );
}
