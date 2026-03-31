"use client";
import { Modal, FormControl, Button } from "react-bootstrap";

export default function AssignmentEditor({
  show,
  handleClose,
  dialogTitle,
  assignmentName,
  setAssignmentName,
  addAssignment,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  assignmentName: string;
  setAssignmentName: (name: string) => void;
  addAssignment: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          value={assignmentName}
          onChange={(e) => {
            setAssignmentName(e.target.value);
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {" "}
          Cancel{" "}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            addAssignment();
            handleClose();
          }}
        >
          Add Module
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
