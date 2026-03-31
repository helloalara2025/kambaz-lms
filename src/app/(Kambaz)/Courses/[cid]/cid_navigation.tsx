// src/app/(Kambaz)/Courses/[cid]/cid_navigation.tsx
"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname(); // gives the current URL pathname

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        href={`/Courses/${cid}/Home`}
        className={`list-group-item border-0 ${
          pathname.endsWith("/Home") ? "active" : "text-danger"
        }`}
      >
        Home
      </Link>
      <Link
        href={`/Courses/${cid}/Modules`}
        className={`list-group-item border-0 ${
          pathname.endsWith("/Modules") ? "active" : "text-danger"
        }`}
      >
        Modules
      </Link>
      <Link
        href={`/Courses/${cid}/Piazza`}
        className={`list-group-item border-0 ${
          pathname.endsWith("/Piazza") ? "active" : "text-danger"
        }`}
      >
        Piazza
      </Link>
      <Link
        href={`/Courses/${cid}/Zoom`}
        className={`list-group-item border-0 ${
          pathname.endsWith("/Zoom") ? "active" : "text-danger"
        }`}
      >
        Zoom
      </Link>
      <Link
        href={`/Courses/${cid}/Assignments`}
        className={`list-group-item border-0 ${
          pathname.endsWith("/Assignments") ? "active" : "text-danger"
        }`}
      >
        Assignments
      </Link>
      <Link
        href={`/Courses/${cid}/Quizzes`}
        className={`list-group-item border-0 ${
          pathname.endsWith("/Quizzes") ? "active" : "text-danger"
        }`}
      >
        Quizzes
      </Link>
      <Link
        href={`/Courses/${cid}/Grades`}
        className={`list-group-item border-0 ${
          pathname.endsWith("/Grades") ? "active" : "text-danger"
        }`}
      >
        Grades
      </Link>
      <Link
        href={`/Courses/${cid}/People/Table`}
        className={`list-group-item border-0 ${
          pathname.endsWith("/People/Table") ? "active" : "text-danger"
        }`}
      >
        People
      </Link>
    </div>
  );
}
