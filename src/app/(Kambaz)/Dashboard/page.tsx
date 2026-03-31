/*******************************************
 * Dashboard Page - Alara Hakki
 * 
 * This is my main dashboard that shows courses.
 * By default, I show only enrolled courses.
 * Users can toggle to see all courses.
 * Faculty can add and delete courses.
 * Students can enroll and unenroll.
 *******************************************/
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { setCourses, addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { setEnrollments, addEnrollment, deleteEnrollment } from "../Enrollments/reducer";
import * as courseClient from "../Courses/client";
import * as enrollmentClient from "../Enrollments/client";

export default function Dashboard() {
  /* I get current user, courses, and enrollments from Redux */
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  /* State for toggling all courses vs my courses */
  const [showAll, setShowAll] = useState(false);

  /* State for new course form */
  const [newCourse, setNewCourse] = useState({ name: "", number: "", description: "" });

  /* Only faculty and admin can add/delete courses */
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  /* I fetch courses and enrollments from backend */
  const fetchData = async () => {
    try {
      /* Get all courses */
      const allCourses = await courseClient.fetchAllCourses();
      dispatch(setCourses(allCourses));

      /* Get enrollments for current user */
      if (currentUser) {
        const userEnrollments = await enrollmentClient.findEnrollmentsForUser(currentUser._id);
        dispatch(setEnrollments(userEnrollments));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentUser]);

  /* I check if user is enrolled in a course - handles both populated and unpopulated data */
  const isEnrolled = (courseId: string) => {
    return enrollments.some((e: any) =>
      e.course === courseId || e.course?._id === courseId
    );
  };

  /* I filter courses based on toggle - show all or only enrolled */
  const displayedCourses = showAll
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  /* I handle adding a new course */
  const handleAddCourse = async () => {
    if (!newCourse.name.trim()) return;
    try {
      const created = await courseClient.createCourse(newCourse);
      dispatch(addNewCourse(created));
      /* Backend auto-enrolls creator, so add enrollment to Redux too */
      dispatch(addEnrollment({ user: currentUser._id, course: created._id }));
      setNewCourse({ name: "", number: "", description: "" });
    } catch (err) {
      console.error("Failed to create course:", err);
      alert("Failed to create course. Please try again.");
    }
  };

  /* I handle updating a course */
  const handleUpdateCourse = async () => {
    if (!newCourse.name.trim()) return;
    try {
      await courseClient.updateCourse(newCourse);
      dispatch(updateCourse(newCourse));
      setNewCourse({ name: "", number: "", description: "" });
    } catch (err) {
      console.error("Failed to update course:", err);
      alert("Failed to update course. Please try again.");
    }
  };

  /* I handle deleting a course */
  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm("Delete this course?")) return;
    await courseClient.deleteCourse(courseId);
    dispatch(deleteCourse(courseId));
  };

  /* I handle enrolling in a course - persists in database */
  const handleEnroll = async (courseId: string) => {
    const enrollment = await enrollmentClient.enrollInCourse(courseId);
    dispatch(addEnrollment(enrollment));
  };

  /* I handle unenrolling from a course - persists in database */
  const handleUnenroll = async (courseId: string) => {
    await enrollmentClient.unenrollFromCourse(courseId);
    dispatch(deleteEnrollment({ userId: currentUser._id, courseId }));
  };

  /* Show message if not signed in */
  if (!currentUser) {
    return <div className="alert alert-warning">Please <Link href="/Account/Signin">sign in</Link>.</div>;
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1><hr />

      {/* Faculty can add new courses */}
      {isFaculty && (
        <div className="card mb-4 p-3">
          <h5>Add Course</h5>
          <div className="row g-2">
            <div className="col-md-3">
              <input className="form-control" placeholder="Name" value={newCourse.name}
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} />
            </div>
            <div className="col-md-2">
              <input className="form-control" placeholder="Number" value={newCourse.number}
                onChange={(e) => setNewCourse({ ...newCourse, number: e.target.value })} />
            </div>
            <div className="col-md-5">
              <input className="form-control" placeholder="Description" value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
            </div>
            <div className="col-md-2">
              <button id="wd-add-new-course-click" className="btn btn-primary w-100 mb-2" onClick={handleAddCourse}>
                Add
              </button>
              <button id="wd-update-course-click" className="btn btn-warning w-100" onClick={handleUpdateCourse}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle between all courses and my enrolled courses */}
      <button className="btn btn-primary mb-3" onClick={() => setShowAll(!showAll)}>
        {showAll ? "My Courses" : "All Courses"}
      </button>

      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2><hr />

      {/* I render course cards in a responsive grid */}
      <div id="wd-dashboard-courses" className="row row-cols-1 row-cols-md-5 g-4">
        {displayedCourses.map((course: any) => (
          <div key={course._id} className="wd-dashboard-course col" style={{ width: 300 }}>
            <div className="card h-100">
              <Link className="wd-dashboard-course-link text-decoration-none text-dark" href={`/Courses/${course._id}/Home`}>
                <img src="/images/reactjs.jpg" width="100%" height={160} alt={course.name} />
                <div className="card-body">
                  <h5 className="wd-dashboard-course-title card-title">{course.number} {course.name}</h5>
                  <p className="card-text text-muted small">{course.description}</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </Link>
              <div className="card-footer">
                {/* Show enroll/unenroll buttons when viewing all courses */}
                {showAll && (
                  isEnrolled(course._id) ? (
                    <button className="btn btn-danger btn-sm me-2" onClick={() => handleUnenroll(course._id)}>
                      Unenroll
                    </button>
                  ) : (
                    <button className="btn btn-success btn-sm me-2" onClick={() => handleEnroll(course._id)}>
                      Enroll
                    </button>
                  )
                )}
                {/* Faculty can delete courses */}
                {isFaculty && (
                  <>
                    <button className="btn btn-outline-danger btn-sm float-end" onClick={(e) => {
                      e.preventDefault();
                      handleDeleteCourse(course._id);
                    }}>
                      Delete
                    </button>

                    <button className="btn btn-outline-warning btn-sm float-end me-2" onClick={(e) => {
                      e.preventDefault();
                      setNewCourse(course);
                    }}>
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}