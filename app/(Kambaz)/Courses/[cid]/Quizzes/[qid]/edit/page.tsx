"use client";

/*
  quiz editor 
  - allows faculty to edit quiz settings and details.
  - loads quiz by id, binds fields to local form state.
  - save (mock) updates local quiz data and returns to quiz details.
  - students see a read-only warning instead of the editor.
*/

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { mockQuizzes, mockUser } from "../../client";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  // local form state for the quiz being edited
  const [form, setForm] = useState<any | null>(null);

  const isFaculty = currentUser?.role === "FACULTY";

  /* step 1 – load user and quizzes from mock data */
  useEffect(() => {
    setCurrentUser(mockUser);
    setQuizzes(mockQuizzes);
  }, [cid, qid]);

  /* step 2 – when quizzes load, find quiz by id and initialize form */
  useEffect(() => {
    if (!quizzes.length) return;
    const quiz = quizzes.find((q) => q._id === qid);
    if (quiz) {
      setForm({
        ...quiz,
        // normalize nulls for controlled inputs
        title: quiz.title || "",
        points: quiz.points ?? 0,
        description: quiz.description || "",
        dueDate: quiz.dueDate || "",
        availableDate: quiz.availableDate || "",
        untilDate: quiz.untilDate || "",
        timeLimit: quiz.timeLimit ?? "",
        shuffleAnswers: !!quiz.shuffleAnswers,
        multipleAttempts: !!quiz.multipleAttempts,
        allowedAttempts: quiz.allowedAttempts ?? "",
        showCorrectAnswers: !!quiz.showCorrectAnswers,
        accessCode: quiz.accessCode || "",
        oneQuestionAtATime: !!quiz.oneQuestionAtATime,
        webcamRequired: !!quiz.webcamRequired,
        lockQuestionsAfterAnswering: !!quiz.lockQuestionsAfterAnswering,
      });
    }
  }, [quizzes, qid]);

  /* step 3 – simple helpers to update form fields */
  const updateField = (name: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const updateCheckbox = (name: string) => {
    setForm((prev: any) => ({ ...prev, [name]: !prev[name] }));
  };

  /* step 4 – handle save (mock only) */
  const handleSave = () => {
    if (!form) return;

    // update local quizzes array
    const updated = quizzes.map((q) =>
      q._id === form._id ? { ...q, ...form } : q
    );
    setQuizzes(updated);

    alert("quiz saved (mock only).");

    // navigate back to quiz details
    router.push(`/Dashboard/Courses/${cid}/Quizzes/${form._id}`);
  };

  const handleCancel = () => {
    if (!form) {
      router.back();
      return;
    }
    router.push(`/Dashboard/Courses/${cid}/Quizzes/${form._id}`);
  };

  /* step 5 – guard if quiz or form is missing */
  if (!form) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-warning">
          loading quiz editor or quiz not found...
        </div>
      </div>
    );
  }

  /* step 6 – if student hits this page, show warning instead of editor */
  if (!isFaculty) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-danger mb-3">
          students cannot edit quizzes. please contact your instructor.
        </div>
        <Link
          href={`/Dashboard/Courses/${cid}/Quizzes/${form._id}`}
          className="btn btn-primary"
        >
          back to quiz details
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid" id="wd-quiz-editor">
      {/* step a – header: title + save/cancel actions */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">edit quiz</h2>
          <div className="text-muted small">
            editing: <strong>{form.title || "untitled quiz"}</strong>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-secondary" onClick={handleCancel}>
            cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            save
          </button>
        </div>
      </div>

      <hr />

      {/* step b – main form layout: left (core settings), right (instructions) */}
      <div className="row">
        {/* left column – core quiz fields */}
        <div className="col-md-8">
          <div className="mb-3">
            <label className="form-label fw-semibold">quiz title</label>
            <input
              className="form-control"
              value={form.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="e.g., midterm exam"
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">points</label>
              <input
                type="number"
                className="form-control"
                value={form.points}
                onChange={(e) =>
                  updateField("points", Number(e.target.value) || 0)
                }
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">time limit (minutes)</label>
              <input
                type="number"
                className="form-control"
                value={form.timeLimit}
                onChange={(e) =>
                  updateField(
                    "timeLimit",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">quiz type</label>
              <select className="form-select" value="graded">
                <option value="graded">graded quiz</option>
                <option value="practice">practice quiz</option>
                <option value="survey-graded">graded survey</option>
                <option value="survey-ungraded">ungraded survey</option>
              </select>
            </div>
          </div>

          {/* dates row */}
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label className="form-label fw-semibold">available from</label>
              <input
                type="datetime-local"
                className="form-control"
                value={form.availableDate || ""}
                onChange={(e) => updateField("availableDate", e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">until</label>
              <input
                type="datetime-local"
                className="form-control"
                value={form.untilDate || ""}
                onChange={(e) => updateField("untilDate", e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label fw-semibold">due</label>
              <input
                type="datetime-local"
                className="form-control"
                value={form.dueDate || ""}
                onChange={(e) => updateField("dueDate", e.target.value)}
              />
            </div>
          </div>

          {/* settings toggles */}
          <div className="mb-3">
            <h5 className="mb-2">options</h5>

            <div className="form-check mb-2">
              <input
                id="shuffleAnswers"
                className="form-check-input"
                type="checkbox"
                checked={form.shuffleAnswers}
                onChange={() => updateCheckbox("shuffleAnswers")}
              />
              <label className="form-check-label" htmlFor="shuffleAnswers">
                shuffle answers
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                id="multipleAttempts"
                className="form-check-input"
                type="checkbox"
                checked={form.multipleAttempts}
                onChange={() => updateCheckbox("multipleAttempts")}
              />
              <label className="form-check-label" htmlFor="multipleAttempts">
                allow multiple attempts
              </label>
            </div>

            {form.multipleAttempts && (
              <div className="mt-2 ms-4" style={{ maxWidth: "200px" }}>
                <label className="form-label small">allowed attempts</label>
                <input
                  type="number"
                  className="form-control form-control-sm"
                  value={form.allowedAttempts}
                  onChange={(e) =>
                    updateField(
                      "allowedAttempts",
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                />
              </div>
            )}

            <div className="form-check mb-2 mt-2">
              <input
                id="showCorrectAnswers"
                className="form-check-input"
                type="checkbox"
                checked={form.showCorrectAnswers}
                onChange={() => updateCheckbox("showCorrectAnswers")}
              />
              <label className="form-check-label" htmlFor="showCorrectAnswers">
                show correct answers after submission
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                id="oneQuestionAtATime"
                className="form-check-input"
                type="checkbox"
                checked={form.oneQuestionAtATime}
                onChange={() => updateCheckbox("oneQuestionAtATime")}
              />
              <label
                className="form-check-label"
                htmlFor="oneQuestionAtATime"
              >
                show one question at a time
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                id="webcamRequired"
                className="form-check-input"
                type="checkbox"
                checked={form.webcamRequired}
                onChange={() => updateCheckbox("webcamRequired")}
              />
              <label className="form-check-label" htmlFor="webcamRequired">
                require webcam
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                id="lockQuestionsAfterAnswering"
                className="form-check-input"
                type="checkbox"
                checked={form.lockQuestionsAfterAnswering}
                onChange={() => updateCheckbox("lockQuestionsAfterAnswering")}
              />
              <label
                className="form-check-label"
                htmlFor="lockQuestionsAfterAnswering"
              >
                lock questions after answering
              </label>
            </div>
          </div>

          {/* access code */}
          <div className="mb-4" style={{ maxWidth: "260px" }}>
            <label className="form-label fw-semibold">access code</label>
            <input
              className="form-control"
              value={form.accessCode}
              onChange={(e) => updateField("accessCode", e.target.value)}
              placeholder="optional"
            />
          </div>
        </div>

        {/* right column – instructions / description */}
        <div className="col-md-4">
          <h5 className="mb-3">instructions</h5>
          <textarea
            className="form-control"
            rows={12}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="add instructions or a description for this quiz..."
          />
          <div className="form-text mt-2 small">
            this text shows on the quiz details page and before students start.
          </div>
        </div>
      </div>
    </div>
  );
}