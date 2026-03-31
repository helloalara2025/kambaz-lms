"use client";
/**
 * QUIZ DETAILS TAB
 * Form for configuring all quiz settings (title, dates, options, instructions).
 * Updates flow upward via updateField() and updateCheckbox() callbacks.
 */
interface QuizDetailsTabProps {
  quiz: any;
  updateField: (name: string, value: any) => void;
  updateCheckbox: (name: string) => void;
}

export default function QuizDetailsTab({
  quiz,
  updateField,
  updateCheckbox
}: QuizDetailsTabProps) {
  return (
    <div className="row">
      {/* Left column - Core settings */}
      <div className="col-md-8">
        
        {/* Quiz Title */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Quiz Title</label>
          <input
            className="form-control"
            value={quiz.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g., Midterm Exam"
          />
        </div>

        {/* Points, Time Limit, Quiz Type */}
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label fw-semibold">Points</label>
            <input
              type="number"
              className="form-control"
              value={quiz.points || ""}
              onChange={(e) => updateField("points", Number(e.target.value) || 0)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Time Limit (minutes)</label>
            <input
              type="number"
              className="form-control"
              value={quiz.timeLimit || ""}
              onChange={(e) => updateField("timeLimit", e.target.value === "" ? "" : Number(e.target.value))}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Quiz Type</label>
            <select 
              className="form-select"
              value={quiz.quizType || "GRADED_QUIZ"}
              onChange={(e) => updateField("quizType", e.target.value)}
            >
              <option value="GRADED_QUIZ">Graded Quiz</option>
              <option value="PRACTICE_QUIZ">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </select>
          </div>
        </div>

        {/* Assignment Group */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Assignment Group</label>
          <select 
            className="form-select"
            value={quiz.assignmentGroup || "QUIZZES"}
            onChange={(e) => updateField("assignmentGroup", e.target.value)}
          >
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECT">Project</option>
          </select>
        </div>

        {/* Dates */}
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <label className="form-label fw-semibold">Available From</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.availableDate ? new Date(quiz.availableDate).toISOString().slice(0, 16) : ""}
              onChange={(e) => updateField("availableDate", e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Until</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.untilDate ? new Date(quiz.untilDate).toISOString().slice(0, 16) : ""}
              onChange={(e) => updateField("untilDate", e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Due</label>
            <input
              type="datetime-local"
              className="form-control"
              value={quiz.dueDate ? new Date(quiz.dueDate).toISOString().slice(0, 16) : ""}
              onChange={(e) => updateField("dueDate", e.target.value)}
            />
          </div>
        </div>

        {/* Options checkboxes */}
        <div className="mb-3">
          <h5 className="mb-2">Options</h5>

          <div className="form-check mb-2">
            <input
              id="shuffleAnswers"
              className="form-check-input"
              type="checkbox"
              checked={quiz.shuffleAnswers || false}
              onChange={() => updateCheckbox("shuffleAnswers")}
            />
            <label className="form-check-label" htmlFor="shuffleAnswers">
              Shuffle Answers
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              id="multipleAttempts"
              className="form-check-input"
              type="checkbox"
              checked={quiz.multipleAttempts || false}
              onChange={() => updateCheckbox("multipleAttempts")}
            />
            <label className="form-check-label" htmlFor="multipleAttempts">
              Allow Multiple Attempts
            </label>
          </div>

          {quiz.multipleAttempts && (
            <div className="mt-2 ms-4" style={{ maxWidth: "200px" }}>
              <label className="form-label small">How Many Attempts</label>
              <input
                type="number"
                className="form-control form-control-sm"
                value={quiz.howManyAttempts || 1}
                onChange={(e) => updateField("howManyAttempts", e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
          )}

          <div className="form-check mb-2">
            <input
              id="oneQuestionAtATime"
              className="form-check-input"
              type="checkbox"
              checked={quiz.oneQuestionAtATime || false}
              onChange={() => updateCheckbox("oneQuestionAtATime")}
            />
            <label className="form-check-label" htmlFor="oneQuestionAtATime">
              Show One Question at a Time
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              id="webcamRequired"
              className="form-check-input"
              type="checkbox"
              checked={quiz.webcamRequired || false}
              onChange={() => updateCheckbox("webcamRequired")}
            />
            <label className="form-check-label" htmlFor="webcamRequired">
              Require Webcam
            </label>
          </div>

          <div className="form-check mb-2">
            <input
              id="lockQuestionsAfterAnswering"
              className="form-check-input"
              type="checkbox"
              checked={quiz.lockQuestionsAfterAnswering || false}
              onChange={() => updateCheckbox("lockQuestionsAfterAnswering")}
            />
            <label className="form-check-label" htmlFor="lockQuestionsAfterAnswering">
              Lock Questions After Answering
            </label>
          </div>
        </div>

        {/* Access Code */}
        <div className="mb-4" style={{ maxWidth: "260px" }}>
          <label className="form-label fw-semibold">Access Code</label>
          <input
            className="form-control"
            value={quiz.accessCode || ""}
            onChange={(e) => updateField("accessCode", e.target.value)}
            placeholder="Optional"
          />
        </div>
      </div>

      {/* Right column - Description */}
      <div className="col-md-4">
        <h5 className="text-wrap align-center mb-3">Quiz Instructions / Quiz Details</h5>
        <textarea
          className="form-control"
          rows={12}
          value={quiz.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Add instructions or a description for this quiz..."
        />
        <div className="form-text mt-2 small">
          This text shows on the quiz details page and before students start.
        </div>
      </div>
    </div>
  );
}