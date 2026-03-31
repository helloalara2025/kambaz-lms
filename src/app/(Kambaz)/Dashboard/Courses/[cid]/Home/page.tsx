// src/app/(Kambaz)/Courses/[cid]/Home/page.tsx ---
/* This file */
// This creates the home screen combining the course status and modules together.
// Combines the Course Status with the Modules to create the Home screen for the course screen.
import Modules from "@/app/(Kambaz)/Courses/[cid]/Modules/page";
import CourseStatus from "@/app/(Kambaz)/Courses/[cid]/Home/coursehomepagestatus";
import React from 'react';

export default function Home() {
  return (
    <div id="wd-home">
      <div className="d-flex" id="wd-home">
        <div className="flex-fill me-3">
          <Modules />
        </div>
        <div className="d-none d-lg-block">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
