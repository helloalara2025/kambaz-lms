// src/app/(Kambaz)/Courses/[cid]/Assignments/page.tsx
"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import AssignmentControls from "./AssignmentControls";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { deleteAssignment, setAssignments } from "./reducer";
import { FaPlus, FaPencil, FaTrash } from "react-icons/fa6";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const assignments = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!cid) return;
      const assignments = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(assignments));
    };
    fetchAssignments();
  }, [cid, dispatch]);

  const handleDelete = async (assignmentId: string) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) {
      return;
    }
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div className="assignments-page p-3">
      {/* Top Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div style={{ width: "300px" }}>
          <input
            className="form-control"
            placeholder="Search for Assignment"
            type="text"
          />
        </div>

        <div className="d-flex gap-2">
          <Button variant="secondary" size="lg">
            <FaPlus className="me-2" />
            Group
          </Button>
          <AssignmentControls />
          <Button variant="outline-secondary" size="sm">
            <BsThreeDotsVertical />
          </Button>
        </div>
      </div>

      {/* Assignment List */}
      <ListGroup className="rounded-0">
        {assignments.map((assignment: any) => (
          <ListGroupItem key={assignment._id} className="p-3">
            <div className="d-flex align-items-start justify-content-between">
              
              {/* Left side: Grip + Title/Description stack */}
              <div className="d-flex align-items-start flex-grow-1">
                <BsGripVertical className="me-2 fs-3" />
                
                <div>
                  {/* Title as link */}
                  <a
                    className="fw-bold text-decoration-none text-dark"
                    href="#"
                    onClick={(e: React.MouseEvent) => {
                      e.preventDefault();
                      router.push(`/Courses/${cid}/Assignments/${assignment._id}`);
                    }}
                  >
                    {assignment.title}
                  </a>
                  
                  {/* Description on new line */}
                  <div className="text-muted small">
                    {assignment.description && <span>{assignment.description} | </span>}
                    {assignment.dueDate && <span>Due: {assignment.dueDate} | </span>}
                    {assignment.points && <span>{assignment.points} pts</span>}
                  </div>
                </div>
              </div>

              {/* Right side: Edit/Delete buttons */}
              <div className="d-flex gap-2">
                <FaPencil
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => router.push(`/Courses/${cid}/Assignments/${assignment._id}`)}
                />
                <FaTrash
                  className="text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDelete(assignment._id)}
                />
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}