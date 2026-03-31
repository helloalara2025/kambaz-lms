import "./index.css";

export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Stling with the STYLE atttribute</h3>
      <p style={{ backgroundColor: "blue", color: "white" }}>
        Style attribute allows configuring look and feel right on the element.
        Although it is very convenient it is considered bad practice and you
        should avoid using the style attribute
      </p>
      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p>
          Instead of changing the look and feel of all the elements of the same
          name, e.g., P, we can refer to a specific element by its ID
        </p>

        <p id="wd-id-selector-2">
          Here is another paragraph using a differnet ID and a different look
          and feel
        </p>
      </div>

      <div id="wd-css-class-selectors">
        <h3>Class Selectors</h3>

        <p className="wd-class-selectors">
          Instead of using IDs to refer to elements, you can use an element&apos;s CLASS attribute.
        </p>

        <h4 className="wd-class-selector">
          This heading has same style as paragraph above.
        </h4>
      </div>
    </div>
  );
}
