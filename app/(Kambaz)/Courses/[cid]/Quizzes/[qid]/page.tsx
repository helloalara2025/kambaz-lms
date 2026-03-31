"use client";

/*
  quiz details – flow & notes
  - shows a single quiz overview for the current course.
  - faculty can preview, edit, publish/unpublish.
  - students see read-only info and a take quiz button.
  - reached from quiz list or after creating a new quiz.
*/

import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { mockQuizzes, mockUser } from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const isFaculty = currentUser?.role === "FACULTY";

  /* step 1 – load user and quizzes from mock data */
  useEffect(() => {
    setCurrentUser(mockUser);
    setQuizzes(mockQuizzes);
  }, [cid, qid]);

  /* step 2 – find the quiz by id from the list */
  const quiz = useMemo(
    () => quizzes.find((q) => q._id === qid),
    [quizzes, qid]
  );

  /* step 3 – compute status and format dates */
  const getAvailabilityStatus = () => {
    if (!quiz) return "";
    const now = new Date();
    const from = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (from && now < from) return `not available until ${from.toLocaleDateString()}`;
    if (until && now > until) return "closed";
    return "available";
  };

  const formatDateTime = (value?: string | null) => {
    if (!value) return "not set";
    const d = new Date(value);
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  /* step 4 – toggle publish/unpublish */
  const togglePublish = () => {
    if (!quiz) return;
    setQuizzes((prev) =>
      prev.map((q) =>
        q._id === quiz._id ? { ...q, published: !q.published } : q
      )
    );
  };

  /* step 5 – guard if quiz is missing */
  if (!quiz) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>quiz not found.</span>
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => router.back()}
          >
            go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" id="wd-quiz-details">

      {/* step 0 – testing tool: switch between faculty/student */}
      <div className="alert alert-info mb-3">
        logged in as:{" "}
        <strong>
          {currentUser?.firstName} {currentUser?.lastName}
        </strong>{" "}
        ({currentUser?.role})
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
          switch to {isFaculty ? "student" : "faculty"}
        </button>
      </div>

      {/* step a – quiz header with actions */}
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h2 className="mb-1">{quiz.title}</h2>

          <div className="text-muted small">
            <span className="me-3">
              <strong>status:</strong>{" "}
              {quiz.published ? (
                <span className="text-success">published</span>
              ) : (
                <span className="text-secondary">unpublished</span>
              )}
            </span>

            <span className="me-3">
              <strong>availability:</strong> {getAvailabilityStatus()}
            </span>

            <span>
              <strong>due:</strong>{" "}
              {quiz.dueDate
                ? new Date(quiz.dueDate).toLocaleDateString()
                : "no due date"}
            </span>
          </div>
        </div>

        {/* step a1 – faculty or student buttons */}
        <div className="d-flex gap-2">
          {isFaculty ? (
            <>
              {/* preview button */}
              <Link
                href={`/Dashboard/Courses/${cid}/Quizzes/${quiz._id}/preview`}
                className="btn btn-outline-secondary"
              >
                <i className="bi bi-eye me-1"></i>
                preview
              </Link>

              {/* edit button */}
              <Link
                href={`/Dashboard/Courses/${cid}/Quizzes/${quiz._id}/edit`}
                className="btn btn-outline-secondary"
              >
                <i className="bi bi-pencil me-1"></i>
                edit
              </Link>

              {/* publish/unpublish button */}
              <button
                className={`btn ${
                  quiz.published ? "btn-outline-secondary" : "btn-success"
                }`}
                onClick={togglePublish}
              >
                {quiz.published ? (
                  <>
                    <i className="bi bi-x-circle me-1"></i> unpublish
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-1"></i> publish
                  </>
                )}
              </button>
            </>
          ) : (
            /* student: take quiz button */
            <Link
              href={`/Dashboard/Courses/${cid}/Quizzes/${quiz._id}/take`}
              className="btn btn-primary"
            >
              <i className="bi bi-play-circle me-1"></i>
              take quiz
            </Link>
          )}
        </div>
      </div>

      <hr />

      {/* step b – summary cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body py-3">
              <div className="text-muted small">points</div>
              <div className="fs-5 fw-semibold">{quiz.points || 0}</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body py-3">
              <div className="text-muted small">questions</div>
              <div className="fs-5 fw-semibold">{quiz.questions?.length || 0}</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body py-3">
              <div className="text-muted small">quiz type</div>
              <div className="fs-6">graded quiz</div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 bg-light">
            <div className="card-body py-3">
              <div className="text-muted small">time limit</div>
              <div className="fs-6">
                {quiz.timeLimit ? `${quiz.timeLimit} minutes` : "none"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* step c – settings + availability info */}
      <div className="row">
        <div className="col-md-8">
          <h5 className="mb-3">quiz settings</h5>

          <dl className="row small">
            <dt className="col-sm-4">available from</dt>
            <dd className="col-sm-8">{formatDateTime(quiz.availableDate)}</dd>

            <dt className="col-sm-4">available until</dt>
            <dd className="col-sm-8">{formatDateTime(quiz.untilDate)}</dd>

            <dt className="col-sm-4">due</dt>
            <dd className="col-sm-8">
              {quiz.dueDate ? formatDateTime(quiz.dueDate) : "no due date"}
            </dd>

            <dt className="col-sm-4">shuffle answers</dt>
            <dd className="col-sm-8">
              {quiz.shuffleAnswers ? "yes" : "no"}
            </dd>

            <dt className="col-sm-4">multiple attempts</dt>
            <dd className="col-sm-8">
              {quiz.multipleAttempts
                ? `yes (${quiz.allowedAttempts || "unlimited"} allowed)`
                : "no"}
            </dd>

            <dt className="col-sm-4">show correct answers</dt>
            <dd className="col-sm-8">
              {quiz.showCorrectAnswers
                ? "after submission"
                : "not shown to students"}
            </dd>

            <dt className="col-sm-4">access code</dt>
            <dd className="col-sm-8">
              {quiz.accessCode ? "required" : "not required"}
            </dd>

            <dt className="col-sm-4">one question at a time</dt>
            <dd className="col-sm-8">
              {quiz.oneQuestionAtATime ? "yes" : "no"}
            </dd>

            <dt className="col-sm-4">webcam required</dt>
            <dd className="col-sm-8">
              {quiz.webcamRequired ? "yes" : "no"}
            </dd>

            <dt className="col-sm-4">lock after answering</dt>
            <dd className="col-sm-8">
              {quiz.lockQuestionsAfterAnswering ? "yes" : "no"}
            </dd>
          </dl>
        </div>

        {/* step d – instructions */}
        <div className="col-md-4">
          <h5 className="mb-3">instructions</h5>
          <div className="border rounded p-3 small bg-light">
            {quiz.description ? (
              <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
            ) : (
              <p className="text-muted mb-0">
                no instructions added. use the editor to add details.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}