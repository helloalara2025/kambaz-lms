"use client";

/**
 * ============================================================================
 * TAKE QUIZ PAGE - STUDENT QUIZ ATTEMPT
 * ============================================================================
 * 
 * @description
 * Allows students to take a quiz and submit their answers.
 * Unlike preview mode, this creates an attempt record in the database
 * and saves all answers for grading.
 * 
 * @features
 * - Start a new quiz attempt
 * - Answer all questions
 * - Auto-save answers (optional)
 * - Submit for grading
 * - View results after submission
 * - Enforce attempt limits
 * - Enforce time limits
 * - Require access code if configured
 * 
 * @workflow
 * 1. Check if quiz is available (published, dates)
 * 2. Check access code if required
 * 3. Check attempt limits (multipleAttempts, howManyAttempts)
 * 4. Start quiz attempt (POST to backend)
 * 5. Display questions and collect answers
 * 6. Submit attempt (POST to backend for grading)
 * 7. Display results
 * 
 * @displays
 * Before Starting:
 * - Quiz instructions
 * - Start Quiz button
 * - Access code input (if required)
 * - Attempt count warning (if applicable)
 * 
 * During Quiz:
 * - Timer (if time limit set)
 * - All questions with inputs
 * - Save Draft button (optional)
 * - Submit button
 * 
 * After Submission:
 * - Final score and percentage
 * - Correct/incorrect per question
 * - Points earned
 * - Option to view all attempts
 * 
 * @restrictions
 * - Students only (faculty should use Preview)
 * - Quiz must be published
 * - Within available date range
 * - Respects attempt limits
 * - Access code required if set
 * 
 * @backend
 * - POST /api/courses/:cid/quizzes/:qid/attempts - Start attempt
 * - PUT /api/courses/:cid/quizzes/:qid/attempts/:attemptId - Save answers
 * - POST /api/courses/:cid/quizzes/:qid/attempts/:attemptId/submit - Submit
 * - GET /api/courses/:cid/quizzes/:qid/attempts/latest - Get latest attempt
 * ============================================================================
 */

/* ID:
 * - cid  -> courseId  (from URL, passed to all course/quiz endpoints)
 * - qid  -> quizId    (from URL, passed to all quiz/attempt endpoints)
 * - attempt._id -> attemptId (returned from startQuizAttempt, used for save/submit)
 *
 * User identity:
 * - The backend infers the current user from the session cookie
 *   (sent by axiosWithCredentials in client.ts), so we never send userId
 *   manually from this page. (student)
 * ============================================================================
 */

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "../../../../client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

export default function TakeQuiz() {
  // ============================================================================
  // ROUTE PARAMETERS & USER
  // ============================================================================

  //retrive id
  const { cid, qid } = useParams();

  // Get the currently logged-in user from Redux
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // Only students should actually take quizzes (instructor uses Preview)
  const isStudent = currentUser?.role === "STUDENT";

  // ============================================================================
  // QUIZ & ATTEMPT STATE
  // ============================================================================

  // Full quiz object loaded from backend (title, description, questions, settings)
  const [quiz, setQuiz] = useState<any>(null);

  // Loading flag for initial quiz/attempt fetch
  const [loading, setLoading] = useState(true);

  // Whether this student has started the current attempt in this session
  const [quizStarted, setQuizStarted] = useState(false);

  // The current attempt object returned from startQuizAttempt
  // It includes _id (attemptId), quizId, courseId, etc.
  const [currentAttempt, setCurrentAttempt] = useState<any>(null);

  // Local answer state:
  // answers[questionId] = selected value (string)
  // For MC/TF: the choice text; for FIB: the typed text.
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Submitted = true means the student has submitted (this or a previous attempt)
  const [submitted, setSubmitted] = useState(false);

  // Results = graded attempt object from backend (score, totalPoints, per-question results)
  const [results, setResults] = useState<any>(null);

  // Access code (if the quiz requires one)
  const [accessCode, setAccessCode] = useState("");
  const [accessCodeVerified, setAccessCodeVerified] = useState(false);

  // Timer: number of seconds remaining; null means no time limit
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  // ============================================================================
  // INITIAL DATA FETCH: QUIZ + LATEST ATTEMPT
  // ============================================================================

  /**
   * (if or when cid/qid change), loads on first render:
   * - Fetch the quiz by cid and qid
   * - Set the document title using the quiz title
   * - Try to get the latest attempt for this quiz and user
   *   - If there is a completed attempt, show the results immediately
   *     instead of letting them start a new attempt here.
   */
  useEffect(() => {
    // Ensure we have both IDs before calling the API
    if (!cid || !qid) return;

    const fetchQuizAndAttempt = async () => {
      try {
        setLoading(true);

        // 1. Load quiz details and questions
        const quizData = await client.findQuizById(
          cid as string,
          qid as string
        );
        setQuiz(quizData);

        // 2. Update tab title to show current location
        if (quizData?.title) {
          document.title = `Take Quiz: ${quizData.title} | Kambaz`;
        }

        // 3. Check for the student's latest attempt
        try {
          const latestAttempt = await client.getLatestAttempt(
            cid as string,
            qid as string
          );

          if (latestAttempt && latestAttempt.completed) {
            // The student has already completed this quiz before:
            // immediately show that attempt's results.
            // students not allowed to take quiz again
            setResults(latestAttempt);
            setSubmitted(true);
          }
        } catch (err) {
          // No previous attempt is not an error; just means they haven't taken it yet.
          console.log("No previous attempts found");
        }
      } catch (error) {
        console.error("Failed to load quiz:", error);
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizAndAttempt();
  }, [cid, qid]);

  // ============================================================================
  // TIMER: COUNTDOWN & AUTO-SUBMIT
  // ============================================================================

  /**
   * When a quiz has a time limit:
   * - timeRemaining is initialized when quiz starts
   * - This effect reduces timeRemaining by 1 every second
   * - When it reaches zero, the quiz auto-submits using handleSubmit()
   */
  useEffect(() => {
    // Only run timer logic when:
    // - The quiz has actually been started
    // - The quiz has a timeLimit
    // - timeRemaining is a valid number
    if (!quizStarted || !quiz?.timeLimit || timeRemaining === null) {
      return;
    }

    // If time has run out, auto-submit once and exit
    if (timeRemaining <= 0) {
      handleSubmit();
      return;
    }

    // Decrement the timer every second
    const timerId = setInterval(() => {
      setTimeRemaining((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    // Clean up interval when component unmounts or dependencies change
    return () => clearInterval(timerId);
  }, [quizStarted, quiz?.timeLimit, timeRemaining]);

  // ============================================================================
  // QUIZ ATTEMPT HANDLERS
  // ============================================================================

  /**
   * Access code validation (if the quiz has quiz.accessCode set).
   * - Compares the entered code with quiz.accessCode.
   * - Only allows moving on to the start screen when it matches.
   */
  const handleAccessCodeSubmit = () => {
    if (quiz.accessCode && accessCode !== quiz.accessCode) {
      toast.error("Incorrect access code");
      return;
    }
    setAccessCodeVerified(true);
  };

  /**
   * Starts a brand new attempt for this quiz and student.
   * - POST /api/courses/:cid/quizzes/:qid/attempts
   * - Backend creates an attempt record and returns it
   * - We store that attempt, mark quizStarted, and initialize timer if needed
   */
  const handleStartQuiz = async () => {
    try {
      const attempt = await client.startQuizAttempt(
        cid as string,
        qid as string
      );

      // attempt._id is the attemptId we will use for save/submit calls
      setCurrentAttempt(attempt);
      setQuizStarted(true);

      // If a time limit exists (in minutes), convert to seconds for the timer
      if (quiz.timeLimit) {
        setTimeRemaining(quiz.timeLimit * 60);
      }

      toast.success("Quiz started! Good luck!");
    } catch (error: any) {
      console.error("Failed to start quiz:", error);
      toast.error(error?.response?.data?.error || "Failed to start quiz");
    }
  };

  /**
   * Local answer change handler.
   * - { [questionId]: value } in state is a simple object stores answer
   * - MC/TF: value is the selected choice string/pick
   * - Fill in the blank: value is the typed text/input
   *
   * The backend expects each answer as an array of strings, so this state is
   * transformed right before calling save/submit.
   */
  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  /**
   * Saves a "draft" of the attempt without grading it.
   * - Requires currentAttempt (attempt must be started first)
   * - Maps the answers object into the backend's expected format:
   *   answers: [{ questionId, answer: [value] }, ...]
   * - Calls PUT /attempts/:attemptId
   *  // stored as an attempt not final
   */
  const handleSaveDraft = async () => {
    if (!currentAttempt) return;

    try {
      const answersArray = Object.keys(answers).map((questionId) => ({
        questionId,
        answer: [answers[questionId]],
      }));

      await client.saveQuizAnswers(
        cid as string,
        qid as string,
        currentAttempt._id,
        answersArray
      );

      toast.success("Answers saved!");
    } catch (error) {
      console.error("Failed to save answers:", error);
      toast.error("Failed to save answers");
    }
  };

  /**
   * Final submission handler.
   * - Requires currentAttempt (attempt must be started first)
   * - Confirms with the student they are ready to submit
   * - Maps local answers into [{ questionId, answer: [value] }, ...]
   * - Calls POST /attempts/:attemptId/submit
   * - Backend grades the quiz and returns a graded attempt
   * - We store that graded attempt in results and flip submitted = true
   */
  const handleSubmit = async () => {
    if (!currentAttempt) return;

    // Confirm only on client 
    const ok =
      typeof window === "undefined"
        ? true
        : window.confirm(
            "Are you sure you want to submit? You cannot change your answers after submission."
          );
    if (!ok) return;

    try {
      const answersArray = Object.keys(answers).map((questionId) => ({
        questionId,
        answer: [answers[questionId]],
      }));

      const gradedAttempt = await client.submitQuizAttempt(
        cid as string,
        qid as string,
        currentAttempt._id,
        answersArray
      );

      setResults(gradedAttempt);
      setSubmitted(true);
      toast.success("Quiz submitted successfully!");
    } catch (error) {
      console.error("Failed to submit quiz:", error);
      toast.error("Failed to submit quiz");
    }
  };

  /**
   * Convert seconds into "MM:SS" string for display in the timer.
   */
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /**
   * Check if the quiz is currently within its available window.
   * - availableDate: start date/time
   * - untilDate: end date/time
   */
  const isQuizAvailable = () => {
    if (!quiz) return false;

    const now = new Date();
    const availableDate = quiz.availableDate
      ? new Date(quiz.availableDate)
      : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (availableDate && now < availableDate) return false;
    if (untilDate && now > untilDate) return false;

    return true;
  };

  // ============================================================================
  // RESTRICTIONS FOR ROLES (role, load state, availability)
  // ============================================================================

  // Only students should see this page; others get redirected to preview/details
  if (!isStudent) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-warning">
          This page is for students only. Faculty should use the Preview
          feature.
        </div>
        <Link
          href={`/Courses/${cid}/Quizzes/${qid}/preview`}
          className="btn btn-primary me-2"
        >
          Preview Quiz
        </Link>
        <Link
          href={`/Courses/${cid}/Quizzes/${qid}`}
          className="btn btn-secondary"
        >
          Back to Quiz Details
        </Link>
      </div>
    );
  }

  // While quiz and attempt  are being loaded
  if (loading) {
    return (
      <div className="container-fluid mt-4 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading quiz...</p>
      </div>
    );
  }

  // If the quiz failed to load
  if (!quiz) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-danger">Quiz not found</div>
        <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-primary">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  // Quiz must be published to be taken
  if (!quiz.published) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-warning">
          This quiz is not yet available. Please check back later.
        </div>
        <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-primary">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  // Quiz must be within its available date window
  if (!isQuizAvailable()) {
    const availableDate = quiz.availableDate
      ? new Date(quiz.availableDate)
      : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;
    const now = new Date();

    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-warning">
          {availableDate && now < availableDate && (
            <>This quiz will be available on {availableDate.toLocaleDateString()}</>
          )}
          {untilDate && now > untilDate && (
            <>This quiz closed on {untilDate.toLocaleDateString()}</>
          )}
        </div>
        <Link href={`/Courses/${cid}/Quizzes`} className="btn btn-primary">
          Back to Quizzes
        </Link>
      </div>
    );
  }

  // ============================================================================
  // MAIN RENDER: ACCESS CODE -> START SCREEN -> TAKING QUIZ -> RESULTS
  // ============================================================================

  return (
    <div className="container-fluid mt-4" style={{ maxWidth: "900px" }}>
      {/* Quiz Title */}
      <h2 className="mb-4">{quiz.title}</h2>

      {/* PHASE 1: ACCESS CODE (IF REQUIRED) */}
      {quiz.accessCode &&
        !accessCodeVerified &&
        !quizStarted &&
        !submitted && (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="bi bi-lock-fill text-warning me-2"></i>
                Access Code Required
              </h5>
              <p className="text-muted">
                This quiz requires an access code to begin.
              </p>
              <div className="row g-2 align-items-end">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <button
                    className="btn btn-primary"
                    onClick={handleAccessCodeSubmit}
                  >
                    Verify Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* PHASE 2: START SCREEN (BEFORE QUIZ STARTS) */}
      {(!quiz.accessCode || accessCodeVerified) &&
        !quizStarted &&
        !submitted && (
          <div>
            {/* Instructions / Description (HTML from backend) */}
            {quiz.description && (
              <div className="card mb-4">
                <div className="card-body">
                  <h5 className="card-title">Instructions</h5>
                  <div
                    dangerouslySetInnerHTML={{ __html: quiz.description }}
                  />
                </div>
              </div>
            )}

            {/* Summary cards: points, question count, time limit */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <div className="text-muted small">Total Points</div>
                    <div className="fs-4 fw-bold">{quiz.points}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <div className="text-muted small">Questions</div>
                    <div className="fs-4 fw-bold">
                      {quiz.questions?.length || 0}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-light">
                  <div className="card-body text-center">
                    <div className="text-muted small">Time Limit</div>
                    <div className="fs-4 fw-bold">
                      {quiz.timeLimit ? `${quiz.timeLimit} min` : "None"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Quiz button */}
            <div className="text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleStartQuiz}
              >
                <i className="bi bi-play-circle me-2"></i>
                Start Quiz
              </button>
            </div>
          </div>
        )}

      {/* PHASE 3: TAKING THE QUIZ (QUESTIONS + TIMER) */}
      {quizStarted && !submitted && (
        <div>
          {/* Timer bar shown only when quiz has time limit */}
          {timeRemaining !== null && (
            <div
              className={`alert ${
                timeRemaining < 60 ? "alert-danger" : "alert-info"
              } mb-4`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <i className="bi bi-clock me-2"></i>
                  <strong>Time Remaining:</strong>{" "}
                  {formatTime(timeRemaining)}
                </div>
                {timeRemaining < 60 && (
                  <span className="badge bg-danger">HURRY!</span>
                )}
              </div>
            </div>
          )}

          {/* Render each question with an appropriate input type */}
          {quiz.questions && quiz.questions.length > 0 && (
            <div className="mb-4">
              {quiz.questions.map((question: any, index: number) => (
                <div key={question._id} className="card mb-3">
                  <div className="card-body">
                    {/* Question header (number, optional title, points) */}
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">
                        Question {index + 1}
                        {question.title && `: ${question.title}`}
                      </h5>
                      <span className="badge bg-secondary">
                        {question.points} pts
                      </span>
                    </div>

                    {/* Question text */}
                    <p className="mb-3">{question.question}</p>

                    {/* MULTIPLE CHOICE INPUTS */}
                    {question.type === "MULTIPLE_CHOICE" && (
                      <div>
                        {question.choices.map(
                          (choice: string, choiceIndex: number) => (
                            <div
                              key={choiceIndex}
                              className="form-check mb-2"
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name={`question-${question._id}`}
                                id={`q${question._id}-choice${choiceIndex}`}
                                value={choice}
                                checked={
                                  answers[question._id] === choice
                                }
                                onChange={(e) =>
                                  handleAnswerChange(
                                    question._id,
                                    e.target.value
                                  )
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`q${question._id}-choice${choiceIndex}`}
                              >
                                {choice}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    )}

                    {/* TRUE/FALSE INPUTS */}
                    {question.type === "TRUE_FALSE" && (
                      <div>
                        {["True", "False"].map((option) => (
                          <div key={option} className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name={`question-${question._id}`}
                              id={`q${question._id}-${option}`}
                              value={option}
                              checked={answers[question._id] === option}
                              onChange={(e) =>
                                handleAnswerChange(
                                  question._id,
                                  e.target.value
                                )
                              }
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`q${question._id}-${option}`}
                            >
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* FILL-IN-THE-BLANK INPUT */}
                    {question.type === "FILL_IN_BLANK" && (
                      <div>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type your answer here..."
                          value={answers[question._id] || ""}
                          onChange={(e) =>
                            handleAnswerChange(
                              question._id,
                              e.target.value
                            )
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Save Draft / Submit buttons */}
          <div className="d-flex gap-2 mb-4">
            <button
              className="btn btn-primary btn-lg"
              onClick={handleSubmit}
            >
              <i className="bi bi-check-circle me-2"></i>
              Submit Quiz
            </button>
            <button
              className="btn btn-outline-secondary btn-lg"
              onClick={handleSaveDraft}
            >
              <i className="bi bi-save me-2"></i>
              Save Draft
            </button>
          </div>
        </div>
      )}

      {/* PHASE 4: RESULTS (AFTER SUBMISSION OR PREVIOUS COMPLETED ATTEMPT) */}
      {submitted && results && (
        <div>
          {/* Overall score summary */}
          <div
            className="card mb-4"
            style={{ maxWidth: "500px", margin: "0 auto" }}
          >
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">
                <i className="bi bi-check-circle me-2"></i>
                Quiz Submitted
              </h4>
            </div>
            <div className="card-body bg-light">
              <div className="row text-center">
                <div className="col-md-4">
                  <div className="p-3">
                    <div className="text-muted small">Your Score</div>
                    <div className="h3 fw-bold text-success mb-0">
                      {results.score}/{results.totalPoints}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3">
                    <div className="text-muted small">Percentage</div>
                    <div className="h3 fw-bold text-success mb-0">
                      {(
                        (results.score / results.totalPoints) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3">
                    <div className="text-muted small">Grade</div>
                    <div className="h3 fw-bold text-success mb-0">
                      {(
                        (results.score / results.totalPoints) *
                        100
                      ) >= 90
                        ? "A"
                        : (results.score / results.totalPoints) * 100 >=
                          80
                        ? "B"
                        : (results.score / results.totalPoints) * 100 >=
                          70
                        ? "C"
                        : (results.score / results.totalPoints) * 100 >=
                          60
                        ? "D"
                        : "F"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Per-question review, only if instructor allows showing answers */}
          {quiz.showCorrectAnswers !== "NEVER" &&
            results.answers && (
              <div className="mb-4">
                <h5 className="mb-3">Question Results</h5>
                {quiz.questions.map((question: any, index: number) => {
                  const answer = results.answers.find(
                    (a: any) => a.questionId === question._id
                  );
                  const isCorrect = answer?.isCorrect;

                  return (
                    <div
                      key={question._id}
                      className={`card mb-3 ${
                        isCorrect ? "border-success" : "border-danger"
                      }`}
                    >
                      <div className="card-body">
                        {/* header with score for the question */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <span className="badge bg-secondary">
                              Q{index + 1}
                            </span>
                            <h6 className="mb-0">
                              {question.title ||
                                `Question ${index + 1}`}
                            </h6>
                          </div>
                          <div className="text-end">
                            {isCorrect ? (
                              <span className="badge bg-success">
                                <i className="bi bi-check-circle-fill me-1"></i>
                                Correct • {answer.pointsEarned}/
                                {question.points} pts
                              </span>
                            ) : (
                              <span className="badge bg-danger">
                                <i className="bi bi-x-circle-fill me-1"></i>
                                Incorrect • 0/{question.points} pts
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Question text */}
                        <p className="mb-3 text-muted">
                          {question.question}
                        </p>

                        {/* MULTIPLE CHOICE REVIEW */}
                        {question.type === "MULTIPLE_CHOICE" && (
                          <div>
                            {question.choices.map(
                              (choice: string, idx: number) => {
                                const isStudentAnswer =
                                  answer?.answer[0] === choice;
                                const isCorrectAnswer =
                                  question.correctAnswers.includes(
                                    choice
                                  );

                                return (
                                  <div
                                    key={idx}
                                    className={`p-2 mb-2 rounded ${
                                      isCorrectAnswer
                                        ? "bg-success bg-opacity-10 border border-success"
                                        : isStudentAnswer &&
                                          !isCorrectAnswer
                                        ? "bg-danger bg-opacity-10 border border-danger"
                                        : "bg-light"
                                    }`}
                                  >
                                    <div className="d-flex align-items-center">
                                      <div className="flex-grow-1">
                                        {choice}
                                      </div>
                                      {isCorrectAnswer && (
                                        <i className="bi bi-check-circle-fill text-success ms-2"></i>
                                      )}
                                      {isStudentAnswer &&
                                        !isCorrectAnswer && (
                                          <i className="bi bi-x-circle-fill text-danger ms-2"></i>
                                        )}
                                      {isStudentAnswer && (
                                        <span className="badge bg-secondary ms-2">
                                          Your Answer
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}

                        {/* TRUE/FALSE REVIEW */}
                        {question.type === "TRUE_FALSE" && (
                          <div>
                            {["True", "False"].map((option) => {
                              const isStudentAnswer =
                                answer?.answer[0] === option;
                              const isCorrectAnswer =
                                question.correctAnswers.includes(
                                  option
                                );

                              return (
                                <div
                                  key={option}
                                  className={`p-2 mb-2 rounded ${
                                    isCorrectAnswer
                                      ? "bg-success bg-opacity-10 border border-success"
                                      : isStudentAnswer &&
                                        !isCorrectAnswer
                                      ? "bg-danger bg-opacity-10 border border-danger"
                                      : "bg-light"
                                  }`}
                                >
                                  <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                      {option}
                                    </div>
                                    {isCorrectAnswer && (
                                      <i className="bi bi-check-circle-fill text-success ms-2"></i>
                                    )}
                                    {isStudentAnswer &&
                                      !isCorrectAnswer && (
                                        <i className="bi bi-x-circle-fill text-danger ms-2"></i>
                                      )}
                                    {isStudentAnswer && (
                                      <span className="badge bg-secondary ms-2">
                                        Your Answer
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* FILL-IN-THE-BLANK REVIEW */}
                        {question.type === "FILL_IN_BLANK" && (
                          <div>
                            <div
                              className={`p-3 rounded ${
                                isCorrect
                                  ? "bg-success bg-opacity-10 border border-success"
                                  : "bg-danger bg-opacity-10 border border-danger"
                              }`}
                            >
                              <div className="mb-2">
                                <strong>Your Answer:</strong>{" "}
                                {answer?.answer[0] || "(no answer)"}
                              </div>
                              <div>
                                <strong>Correct Answers:</strong>{" "}
                                {question.correctAnswers.join(", ")}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* A small nudge to review when incorrect */}
                        {!isCorrect && (
                          <div className="alert alert-danger mt-3 mb-0 py-2 small">
                            <i className="bi bi-info-circle me-2"></i>
                            Review the correct answer above and try to
                            understand why.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          {/* If instructor hides correct answers entirely */}
          {quiz.showCorrectAnswers === "NEVER" && (
            <div className="alert alert-info mb-4">
              <i className="bi bi-eye-slash me-2"></i>
              Your instructor has chosen not to show correct answers
              for this quiz.
            </div>
          )}

          {/* Navigation after submission */}
          <div className="d-flex gap-2">
            <Link
              href={`/Courses/${cid}/Quizzes`}
              className="btn btn-primary"
            >
              Back to Quizzes
            </Link>
            <Link
              href={`/Courses/${cid}/Quizzes/${qid}`}
              className="btn btn-outline-secondary"
            >
              View Quiz Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}