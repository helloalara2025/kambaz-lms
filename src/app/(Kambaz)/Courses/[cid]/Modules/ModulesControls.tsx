/* This file implements the controls at the dop of the <Module> in a new ModuleControls componenet */
"use client";
import ModuleEditor from "./ModuleEditor";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div id="wd-modules-controls" className="text-nowrap mb-3">
        <div className="d-flex justify-content-end gap-2 flex-wrap">
          
          {/* Collapse All - Hides on small/medium screens */}
          <Button
            variant="secondary" 
            size="lg"
            className="d-none d-lg-inline-block"
            id="wd-collapse-all"
          >
            Collapse All
          </Button>

          {/* View Progress - Hides on small/medium screens */}
          <Button
            variant="secondary"
            size="lg"
            className="d-none d-lg-inline-block"
            id="wd-view-progress"
          >
            View Progress
          </Button>

          {/* Publish All Dropdown - Always visible */}
          <Dropdown> 
            <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
              <GreenCheckmark /> Publish All
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem id="wd-publish-all">
                <GreenCheckmark /> Publish All
              </DropdownItem>
              <DropdownItem id="wd-publish-all-modules-and-items">
                <GreenCheckmark /> Publish all modules and items
              </DropdownItem>
              <DropdownItem id="wd-publish-modules-only">
                <GreenCheckmark /> Publish modules only
              </DropdownItem>
              <DropdownItem id="wd-unpublish-all-modules-and-items">
                Unpublish all modules and items
              </DropdownItem>
              <DropdownItem id="wd-unpublish-modules-only">
                Unpublish modules only
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          {/* Add Module Button - Always visible, opens modal */}
          <Button
            variant="danger"
            size="lg"
            onClick={handleShow}
            id="wd-add-module-btn"
          >
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Module
          </Button>
        </div>
      </div>

      {/* Module Editor Modal */}
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </>
  );
}