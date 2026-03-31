// src/app/Kambaz/Dashboard/Courses/[cid]/Home/page.tsx

// This creates the home screen combining the course status and modules together.
// Combines the Course Status with the Modules to create the Home screen for the course screen.

import Modules from "../Modules/page";  
import CourseStatus from "./coursehomepagestatus"; 

export default function Home() {
  return (
    <div id="wd-course-home" className="p-3">
      {/* Top: course status summary */}
      <section className="mb-4">
        <CourseStatus />
      </section>

      {/* Bottom: modules list */}
      <section>
        <Modules />
      </section>
    </div>
  );
}