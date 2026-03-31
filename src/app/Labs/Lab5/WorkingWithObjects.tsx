"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "CS101",
    name: "Introductions",
    description: "H",
    course: "Computer Science",
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects" className="container py-3">
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />

      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${HTTP_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />

      {/* Update Title */}
      <h4>Modifying Properties</h4>
      <div className="d-flex align-items-center gap-2 mb-3">
        <FormControl
          id="wd-assignment-title"
          defaultValue={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <a
          id="wd-update-assignment-title"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
        >
          Update Title
        </a>
      </div>

      {/* Update Score */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <FormControl
          id="wd-assignment-score"
          type="number"
          defaultValue={assignment.score}
          onChange={(e) =>
            setAssignment({ ...assignment, score: Number(e.target.value) })
          }
        />
        <a
          id="wd-update-assignment-score"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
        >
          Update Score
        </a>
      </div>

      {/* Update Completed */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <input
          id="wd-assignment-completed"
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <a
          id="wd-update-assignment-completed"
          className="btn btn-primary"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
        >
          Update Completed
        </a>
      </div>

      <hr />

      {/* MODULE SECTION */}
      <h4>Retrieving Module</h4>
      <a
        id="wd-retrieve-module"
        className="btn btn-primary"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <hr />

      <h4>Retrieving Module Name</h4>
      <a
        id="wd-retrieve-module-name"
        className="btn btn-primary"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <hr />

      {/* Update Module Name */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <FormControl
          id="wd-module-name"
          defaultValue={module.name}
          onChange={(e) =>
            setModule({ ...module, name: e.target.value })
          }
        />
        <a
          id="wd-update-module-name"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/name/${module.name}`}
        >
          Update Name
        </a>
      </div>

      {/* Update Module Description */}
      <div className="d-flex align-items-center gap-2 mb-3">
        <FormControl
          id="wd-module-description"
          defaultValue={module.description}
          onChange={(e) =>
            setModule({ ...module, description: e.target.value })
          }
        />
        <a
          id="wd-update-module-description"
          className="btn btn-primary"
          href={`${MODULE_API_URL}/description/${module.description}`}
        >
          Update Description
        </a>
      </div>

      <hr />
    </div>
  );
}
