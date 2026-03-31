import "./index.css";
import { Container } from "react-bootstrap"; 
import ForegroundColors from "./ForegroundColors";
import BackgroundColors from "./BackgroundColors";
import Padding from "./padding";
import Boarders from "./boarders";
import Margins from "./margins";
import Corners from "./corners";
import Dimensions from "./dimensions";
import Positions from "./positions";
import Zindex from "./zindex";
import Float from "./float";
import GridLayout from "./gridlayout";
import Flex from "./flex";
import BootstrapGrids from "./BootstrapGrids";
import BootstrapTables from "./BootstrapTables"; 
import BoostrapLists from "./BootstrapLists";
import BootstrapForms from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";

export default function Lab2() {
  return (
    <Container>
      <h2>Lab 2 - Cascading Style Sheets</h2>
      <h3>Styling with the STYLE attribute</h3>
      <div id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p style={{ backgroundColor: "blue", color: "white" }}>
          Style attribute allows configuring look and feel right on the element.
          Although it is very convenient it is considered bad practice and you
          should avoid using the style attribute.
        </p>

        <p id="wd-id-selector-1">
          Instead of changing the look and feel of all the elements of the same
          name, e.g., P, we can refer to a specific element by its ID
        </p>

        <p id="wd-id-selector-2">
          Here is another paragraph using a different ID and a different look
          and feel
        </p>
      </div>

      <div id="wd-class-selectors">
        <h3>Class selectors</h3>

        <p className="wd-class-selector">
          Instead of using IDs to refer to elemetns, youc an use an elements
          CLASS attribute.
        </p>

        <h4 className="wd-class-selector">
          This heading has same style as paragraph above
        </h4>
      </div>

      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document structure selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to refer elements in particular places in
            the document
            <p className="wd-selector-3">
              This paragraphs red background is referenced as
              <br />
              .selector-2 .selector3
              <br />
              meaning the descendant of some ancestor.
              <br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent
              </span>
              <br />
              You can combine these relationships to create specific styles
              depending on the document structure
            </p>
          </div>
        </div>
      </div>
      <ForegroundColors />
      <BackgroundColors />
      <Boarders />
      <Padding />
      <Margins />
      <Corners />
      <Dimensions />
      <Positions />
      <Zindex />
      <Float />
      <GridLayout />
      <Flex />
      <BootstrapGrids />
      <BootstrapTables />
      <BoostrapLists />
      <Corners />
      <BootstrapForms />
      <BootstrapNavigation />
    {/* </div> */}
    </Container>
  );
}
