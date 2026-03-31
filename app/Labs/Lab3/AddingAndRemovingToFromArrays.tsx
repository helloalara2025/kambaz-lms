export default function AddingAndRemovingToFromArrays() {
  const numberArray1 = [1, 2, 3, 4, 5]; // Made a const due to ESLint rules
  const stringArray1 = ["string1", "string2"]; // Made a const due to ESLint rules
  const todoArray = [
    // // Made a const due to ESLint rules
    <li key="1"> Buy milk </li>,
    <li key="2"> Feed the pets </li>,
  ];

  numberArray1.push(6); // adding new items
  stringArray1.push("string3");
  todoArray.push(<li key="3">Walk the dogs</li>);

  numberArray1.splice(2, 1); // remove 1 item starting at 2
  stringArray1.splice(1, 1);
  return (
    <div id="wd-adding-removing-from-arrays">
      <h4>Add/remove to/from arrays</h4>
      numberArray1 = {numberArray1} <br />
      stringArray1 = {stringArray1} <br />
      Todo list:
      <ol>{todoArray}</ol>
      <hr />
    </div>
  );
}
