export default function Flex() {
  return (
    /* Note how DIV elements inside the container render horizontally as a row of element instead of stacking the elements vertically. */
    // <div id="wd-css-flex">
    //   <h2>Flex</h2>
    //   <div className="wd-flex-row-container">
    //     <div className="wd-bg-color-yellow">Column 1</div>
    //     <div className="wd-bg-color-blue">Column 2</div>
    //     <div className="wd-bg-color-red">Column 3</div>
    //   </div>
    // </div>

    /* Flex simplifies laying out content horizontally. Flex child elements can also be configured to grow and expand to fill into empty spaces. The styling below illustrates how the last column can expand into the empty space to its right. */
    // <div id="wd-css-flex">
    //   <h2>Flex</h2>
    //   <div className="wd-flex-row-container">
    //     <div className="wd-bg-color-yellow">Column 1</div>
    //     <div className="wd-bg-color-blue">Column 2</div>
    //     <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
    //   </div>
    // </div>

    /* The rest of the flex child elements can be configured independently to have specific widths to fit whatever content is needed as shown below*/
    <div id="wd-css-flex">
      <h2>Flex</h2>
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
      </div>
    </div>
  );
}
