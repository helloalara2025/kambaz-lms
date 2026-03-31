// src/app/Kambaz/Dashboard/Courses/[cid]/layout.tsx

// Preserve the Kambaz navigation and layout for all course pages.

import Modules from "../../../Courses/[cid]/Modules/page";
import CourseStatus from "../../../Courses/[cid]/Home/coursehomepagestatus";
import React from "react";
import CourseNavigation from "../../../Courses/[cid]/cid_navigation"; 

export default async function CoursesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div id="wd-course-shell" className="d-flex">
      {/* Left: course navigation for the specific course */}
      <aside
        id="wd-course-nav"
        className="border-end pe-3 me-3"
        style={{ minWidth: 240 }}
      >
        <div className="d-flex align-items-center gap-2 mb-3">
          <FaAlignJustify />
          <span>Course Navigation</span>
        </div>
        <CourseNavigation />
      </aside>

      {/* Right: the actual page content (Home, Modules, Assignments, etc.) */}
      <main id="wd-course-content" className="flex-grow-1">
        {children}
      </main>
    </div>
  );
}