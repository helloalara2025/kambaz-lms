/* src/app/(Kambaz)/Courses/[cid]/layout file is responsible for the course-specific navigation sidebar.
- should have Home, Modules, Piazza, Zoom, Assignments, Quizzes, Grades, People. 
*/
"use client";
// Presereve the Kambaz navigation and layout for all courses pages.
import { ReactNode, useState } from "react"; // for children
import CourseNavigation from "./cid_navigation"; // for the course nav. sidebar
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa"; // for the heading and hamburger icon

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);

  const [showNav, setShowNav] = useState(true); // hamburger bar visibility
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          style={{ cursor: "pointer" }}
          onClick={() =>
            setShowNav(!showNav)
          } /* Toggle activity for nav hamburger bar */
        />
        {course?.name}
      </h2>
      <hr />

      <div className="d-flex">
        {/* renders sidebar based on the state */}
        {showNav && (
          <div className="d-none d-md-block" style={{ width: "320px" }}>
            <CourseNavigation />
          </div>
        )}

        {/* Main Content - Takes remaining space 
        minWidth prevnets flex overflow */}
        <div className="flex-fill" style={{ minWidth: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
}