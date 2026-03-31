// Dashboard page - With working enrollment
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as client from "../Courses/client";
import * as accountClient from "../Account/client";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../Courses/reducer";
import { RootState } from "../store";
import { setEnrollments, enrollCourse, unenrollCourse } from "./enrollmentsReducer";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: { _id: string; role: string } | null };
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  const dispatch = useDispatch();
  const router = useRouter();
  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-25",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  // Fetch courses based on mode
  const fetchCourses = async () => {
    if (!currentUser) return;
    try {
      if (showAllCourses) {
        const courses = await client.fetchAllCourses();
        dispatch(setCourses(courses));
      } else {
        const courses = await client.findMyCourses();
        dispatch(setCourses(courses));
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
   const loadData = async () => {
      if (currentUser) {
        const userEnrollments = await accountClient.fetchEnrollments(currentUser._id);
        dispatch(setEnrollments(userEnrollments));
      }
      await fetchCourses();
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, showAllCourses]);

  // Add new course
  const onAddNewCourse = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(setCourses([...courses, newCourse]));
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  // Delete course
  const onDeleteCourse = async (courseId: string) => {
    try {
      await client.deleteCourse(courseId);
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Failed to delete course");
    }
  };

  // Update course
  const onUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      dispatch(setCourses(courses.map((c) => (c._id === course._id ? course : c))));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Check if user is enrolled
  const isEnrolled = (courseId: string) => {
    return enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId
    );
  };

  // Enroll in course
  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await accountClient.enrollIntoCourse(currentUser._id, courseId);
      dispatch(enrollCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Enroll failed:", error);
      alert("Failed to enroll");
    }
  };

  // Unenroll from course
  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    try {
      await accountClient.unenrollFromCourse(currentUser._id, courseId);
      dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
    } catch (error) {
      console.error("Unenroll failed:", error);
      alert("Failed to unenroll");
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>

      {/* Enrollment toggle button */}
      <Button
        variant="primary"
        onClick={() => setShowAllCourses(!showAllCourses)}
      >
        {showAllCourses ? "My Courses" : "Enrollments"}
      </Button>
      <hr />

      {/* Faculty course management */}
      {currentUser?.role === "FACULTY" && !showAllCourses && (
        <>
          <h5>
            New Course
            <button
              id="wd-add-new-course-click"
              className="btn btn-primary float-end"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              id="wd-update-course-click"
              onClick={onUpdateCourse}
              className="btn btn-warning float-end me-2"
            >
              Update
            </button>
          </h5>
          <hr />

          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      {/* Course count header */}
      <h2 id="wd-dashboard-published">
        {showAllCourses ? "All Courses" : "Published Courses"} ({courses.length})
      </h2>
      <hr />

      {/* Courses grid */}
      <div id="wd-dashboard-courses">
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {courses
          .filter((course) => showAllCourses || isEnrolled(course._id))
          .map((course) => (
            <Col key={course._id} style={{ width: "350px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}/Home`}
                  className="text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/introtocompsci.jpg"
                    variant="top"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle>{course.name}</CardTitle>
                    <CardText style={{ height: "100px" }}>
                      {course.description}
                    </CardText>
                  </CardBody>
                </Link>

                <CardBody className="pt-0">
                  <div className="d-flex justify-content-between">
                    {/* Go button */}
                    <Button
                      variant="primary"
                      onClick={() => router.push(`/Courses/${course._id}/Home`)}
                    >
                      Go
                    </Button>

                    {/* Enroll/Unenroll (enrollment mode only) */}
                    {showAllCourses && currentUser && (
                      isEnrolled(course._id) ? (
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            e.preventDefault();
                            handleUnenroll(course._id);
                          }}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={(e) => {
                            e.preventDefault();
                            handleEnroll(course._id);
                          }}
                        >
                          Enroll
                        </Button>
                      )
                    )}

                    {/* Faculty Edit/Delete (my courses mode only) */}
                    {!showAllCourses && currentUser?.role === "FACULTY" && (
                      <>
                        <button
                          className="btn btn-warning me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(course);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            onDeleteCourse(course._id);
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}