export default function SimpleArrays() {
  const functionScoped = 2;
  const blockScoped = 5;
  const constant1 = functionScoped - blockScoped;
  const numberArray1 = [1, 2, 3, 4, 5];
  const stringArray1 = ["string1", "string2"];
  const htmlArray1 = [<li key={1}>Buy milk</li>, <li key={2}>Feed the pets</li>];
  const variableArray1 = [
    functionScoped,
    blockScoped,
    constant1,
    numberArray1,
    stringArray1,
  ];
  return (
    <div id="wd-simple-arrays">
      <h4>Simple Arrays</h4>
      numberArray1 = {numberArray1} <br />
      stringArray1 = {stringArray1} <br />
      variableArray1 = {variableArray1} <br />
      Todo list:
      <ol>{htmlArray1}</ol>
      <hr />
    </div>
  );
}
