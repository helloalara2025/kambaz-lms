"use client";
/*
  Quiz List Page - Req
  1 - Empty state prompting “Add Quiz”.
  2 - Displays sorted quiz list.
  3 - + Quiz creates default quiz and navigates to editor.
  4 - 3-dots menu: Edit, Delete, Publish/Unpublish, Preview.
  5 - Published quizzes show green check.
  6 - Clicking title opens Quiz Details.
*/

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { mockQuizzes, mockUser } from "./client";

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const isFaculty = currentUser?.role === "FACULTY";

  /* step1 - load quizzes (simulate backend) + sort by available date */
  useEffect(() => {
    setCurrentUser(mockUser);

    const sorted = [...mockQuizzes].sort((a, b) => {
      const ad = a.availableDate ? new Date(a.availableDate).getTime() : 0;
      const bd = b.availableDate ? new Date(b.availableDate).getTime() : 0;
      return ad - bd;
    });

    setQuizzes(sorted);
  }, [cid]);

  /*  step2 add quiz +quiz button creates default quiz + navigates to /Quizzes/[newId] */
  const handleCreateQuiz = () => {
    const newQuiz = {
      _id: Date.now().toString(),
      title: "New Quiz",
      published: false,
      availableDate: null,
      untilDate: null,
      dueDate: null,
      points: 0,
      questions: []
    };

    setQuizzes((prev) => [...prev, newQuiz]);
    router.push(`/Dashboard/Courses/${cid}/Quizzes/${newQuiz._id}`);
  };

  /* step3 — delete quiz option */
  const handleDeleteQuiz = (quizId: string) => {
    if (!confirm("Delete this quiz?")) return;
    setQuizzes(quizzes.filter((q) => q._id !== quizId));
  };

  /* step4 - publish/unpublish toggle */

  const togglePublish = (quiz: any) => {
    setQuizzes((prev) =>
      prev.map((q) =>
        q._id === quiz._id ? { ...q, published: !q.published } : q
      )
    );
  };

  /* step5 - availability toggle and date, shows until when the quiz will be available */
  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const from = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (from && now < from) return `Not available until ${from.toLocaleDateString()}`;
    if (until && now > until) return "Closed";
    return "Available";
  };

  /* steo6 = search functionality
      student-only feature that will be able to search once a course is published     */
  /* ---------------------------------------------------------------------- */
  const filtered = quizzes.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayQuizzes = isFaculty
    ? filtered
    : filtered.filter((q) => q.published);


  /*  render                                                        */
  /* ---------------------------------------------------------------------- */
  return (
    <div className="container-fluid" id="wd-quizzes">

      {/* STEP 0 — Testing utility: switch between faculty/student */}
      <div className="alert alert-info mb-3">
        Logged in as:{" "}
        <strong>{currentUser?.firstName} {currentUser?.lastName}</strong> ({currentUser?.role})
        <button
          className="btn btn-sm btn-outline-primary ms-3"
          onClick={() =>
            setCurrentUser(
              currentUser?.role === "FACULTY"
                ? { ...mockUser, role: "STUDENT" }
                : mockUser
            )
          }
        >
          Switch to {isFaculty ? "Student" : "Faculty"}
        </button>
      </div>

      {/* search bar and add quiz button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="input-group" style={{ maxWidth: "300px" }}>
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search quizzes…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isFaculty && (
          <button className="btn btn-danger" onClick={handleCreateQuiz}>
            <i className="bi bi-plus-lg"></i> Quiz
          </button>
        )}
      </div>

      {/* quiz list container */}
      <ul className="list-group">

        {/* section label */}
        <li className="list-group-item bg-light border-0">
          <h5 className="mb-0">
            <i className="bi bi-grip-vertical me-2"></i>
            Assignment Quizzes
          </h5>
        </li>

        {/* empty state */}

        {displayQuizzes.length === 0 ? (
          <li className="list-group-item text-center py-5">
            {isFaculty ? (
              <>
                <p className="text-muted mb-2">No quizzes yet</p>
                <button className="btn btn-primary" onClick={handleCreateQuiz}>
                  <i className="bi bi-plus-lg"></i> Create Your First Quiz
                </button>
              </>
            ) : (
              <p className="text-muted">No quizzes available</p>
            )}
          </li>
        ) : (
          /* quiz item rows*/
          displayQuizzes.map((quiz) => (
            <li
              key={quiz._id}
              className="list-group-item d-flex align-items-start py-3 px-2"
            >

              {/* visual/faculty */}
              {isFaculty && (
                <i className="bi bi-grip-vertical text-muted me-3 mt-2"></i>
              )}

              {/* Canvas rocket icon */}
              <i
                className="bi bi-rocket-takeoff text-success me-3 mt-2"
                style={{ fontSize: "1.5rem" }}
              ></i>

              {/* title + metadata */}
              <div className="flex-grow-1">
                {/* quiz details (or Take view for students) */}
                <Link
                  href={
                    isFaculty
                      ? `/Dashboard/Courses/${cid}/Quizzes/${quiz._id}`     /* navigating to the quiz details */
                      : `/Dashboard/Courses/${cid}/Quizzes/${quiz._id}/take`
                  }
                  className="fw-bold text-dark text-decoration-none"
                >
                  {quiz.title}
                </Link>

                {/* availability, due, points, questions */}
                <div className="text-muted small mt-1">
                  <span className="me-3"><strong>{getAvailabilityStatus(quiz)}</strong></span>
                  <span className="me-2">|</span>
                  <span className="me-3">
                    <strong>Due:</strong>{" "}
                    {quiz.dueDate
                      ? new Date(quiz.dueDate).toLocaleDateString()
                      : "No due date"}
                  </span>
                  <span className="me-2">|</span>
                  <span className="me-3">{quiz.points || 0} pts</span>
                  <span className="me-2">|</span>
                  <span>{quiz.questions?.length || 0} Questions</span>
                </div>
              </div>

              {/* Faculty actions: Publish + 3-dot menu */}
              {isFaculty && (
                <div className="d-flex align-items-center">

                  {/* Publish/Unpublish toggle */}
                  <button
                    className="btn btn-link text-decoration-none me-2"
                    onClick={() => togglePublish(quiz)}
                  >
                    {quiz.published ? (
                      <i className="bi bi-check-circle-fill text-success fs-4"></i>
                    ) : (
                      <i className="bi bi-slash-circle text-secondary fs-4"></i>
                    )}
                  </button>

                  {/* 3-dots dropdown menu */}
                  <div className="dropdown">
                    <button
                      className="btn btn-link text-dark"
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-three-dots-vertical"></i>
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                      {/* edit */}
                      <li>
                        <Link
                          className="dropdown-item"
                          href={`/Dashboard/Courses/${cid}/Quizzes/${quiz._id}`}
                        >
                          <i className="bi bi-pencil me-2"></i>Edit
                        </Link>
                      </li>

                      {/* delete */}
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleDeleteQuiz(quiz._id)}
                        >
                          <i className="bi bi-trash me-2"></i>Delete
                        </button>
                      </li>

                      {/* publish/unpublish */}
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => togglePublish(quiz)}
                        >
                          <i
                            className={`bi ${
                              quiz.published ? "bi-x-circle" : "bi-check-circle"
                            } me-2`}
                          ></i>
                          {quiz.published ? "Unpublish" : "Publish"}
                        </button>
                      </li>

                      <li><hr className="dropdown-divider" /></li>

                      <li>
                        <Link
                          className="dropdown-item"
                          href={`/Dashboard/Courses/${cid}/Quizzes/${quiz._id}/preview`}
                        >
                          <i className="bi bi-eye me-2"></i>Preview
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}