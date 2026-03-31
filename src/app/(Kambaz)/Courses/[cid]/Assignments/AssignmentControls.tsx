"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

export default function AssignmentControls() {
  const { cid } = useParams();
  const router = useRouter();

  // handles redirect to the assignment editor page - keeping functionality separate
  const handleClick = () => {
  router.push(`/Courses/${cid}/Assignments/new`);
};

  return (
    <div 
    id="wd-assignment-controls" 
    className="text-nowrao mb-3">

      {/* Buttont to redirect to the assignment editor page - creating a new assignment/editing */}
      <Button
        variant="danger"
        size="lg"
        className="float-end"
         onClick={handleClick}
      >
        <FaPlus className="me-2"/>
        Assignment
      </Button>
    </div>
  );
}