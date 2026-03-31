"use client";

/**
 * ============================================================================
 * QUIZ PREVIEW PAGE - FACULTY TESTING MODE
 * ============================================================================
 * 
 * @description
 * Allows faculty to preview and test the quiz as students would see it.
 * Faculty can answer questions and see their score, but answers are NOT
 * saved to the database (preview only, no attempt records created).
 * 
 * @features
 * - Take the quiz in student view
 * - See score and results after submission
 * - View correct/incorrect answers with visual feedback
 * - Reset and try again
 * - Navigate back to edit mode
 * - Preview-only banner at top
 * 
 * @displays
 * Before Submission:
 * - Preview mode banner with "Edit Quiz" button
 * - Quiz title and instructions
 * - Quiz info cards (points, questions, time limit)
 * - All questions with answer inputs
 * - Submit Preview button
 * 
 * After Submission:
 * - Correct answers highlighted in green with checkmarks
 * - Incorrect answers shown in red
 * - Points earned per question
 * - Results summary card (score, percentage, letter grade)
 * - "Try Again" and "Edit Quiz" buttons
 * 
 * @questionTypes
 * - Multiple Choice: Radio buttons
 * - True/False: Radio buttons (True/False)
 * - Fill in the Blank: Text input with case-insensitive matching
 * 
 * @grading
 * All grading happens client-side (in browser):
 * - Multiple Choice: Checks if answer matches correctAnswers array
 * - True/False: Checks if answer matches correctAnswers array
 * - Fill in Blank: Case-insensitive comparison with correctAnswers
 * 
 * @userRoles
 * - Faculty ONLY: Students should use "Take Quiz" feature instead
 * - Shows warning if non-faculty user accesses this page
 * 
 * @navigation
 * - Edit Quiz button → /Courses/[cid]/Quizzes/[qid]/edit
 * - Back to Quiz → /Courses/[cid]/Quizzes/[qid]
 * - Cancel → /Courses/[cid]/Quizzes/[qid]
 * 
 * ============================================================================
 */

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import * as client from "../../../../client";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { FaEye } from "react-icons/fa6";

export default function PreviewQuiz() {
  // ============================================================================
  // STATE & ROUTE PARAMETERS
  // ============================================================================
  
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  // Quiz data
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Answer tracking
  const [answers, setAnswers] = useState<any>({});
  
  // Submission state
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);

  const isFaculty = currentUser?.role === "FACULTY";

  // ============================================================================
  // DATA FETCHING
  // ============================================================================
  
  /**
   * Fetches quiz data on component mount
   * Loads complete quiz with all questions
   */
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await client.findQuizById(cid as string, qid as string);
        setQuiz(data);
      } catch (error) {
        console.error("Failed to load quiz:", error);
        toast.error("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [cid, qid]);

  // ============================================================================
  // ANSWER HANDLING
  // ============================================================================

  /**
   * Updates answer for a specific question
   * Stores answers in local state (not saved to backend)
   * 
   * @param questionId - MongoDB _id of the question
   * @param answer - Selected answer (string or array)
   */
  const handleAnswerChange = (questionId: string, answer: any) => {
    setAnswers((prev: any) => ({
      ...prev,
      [questionId]: answer
    }));
  };

  /**
   * Grades the quiz locally (client-side only)
   * No backend call - this is preview only
   * Compares student answers with correct answers from quiz data
   * Calculates score, percentage, and per-question results
   */
  const handleSubmit = () => {
    if (!quiz) return;

    let totalScore = 0;
    let totalPoints = 0;
    const questionResults: any = {};

    // Grade each question
    quiz.questions.forEach((question: any) => {
      totalPoints += question.points;
      const studentAnswer = answers[question._id];
      let isCorrect = false;

      // Grade based on question type
      if (question.type === "MULTIPLE_CHOICE") {
        // Check if selected answer is in correctAnswers array
        isCorrect = studentAnswer && question.correctAnswers.includes(studentAnswer);
      } else if (question.type === "TRUE_FALSE") {
        // Check if selected answer is in correctAnswers array
        isCorrect = studentAnswer && question.correctAnswers.includes(studentAnswer);
      } else if (question.type === "FILL_IN_BLANK") {
        // Case-insensitive comparison with any correct answer
        const normalizedAnswer = studentAnswer?.toLowerCase().trim();
        isCorrect = question.correctAnswers.some(
          (correct: string) => correct.toLowerCase().trim() === normalizedAnswer
        );
      }

      // Award points if correct
      if (isCorrect) {
        totalScore += question.points;
      }

      // Store results for this question
      questionResults[question._id] = {
        isCorrect,
        studentAnswer,
        correctAnswers: question.correctAnswers,
        points: question.points,
        earned: isCorrect ? question.points : 0
      };
    });

    // Store overall results
    setResults({
      score: totalScore,
      totalPoints,
      percentage: totalPoints > 0 ? (totalScore / totalPoints) * 100 : 0,
      questionResults
    });

    setSubmitted(true);
    toast.success("Preview submitted! Scroll down to see results.");
  };

  /**
   * Resets the preview to start over
   * Clears all answers and results
   * Scrolls back to top of page
   */
  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setResults(null);
    window.scrollTo(0, 0);
  };

  // ============================================================================
  // RENDER GUARDS - HANDLE AUTHORIZATION, LOADING & ERROR STATES
  // ============================================================================

  /**
   * Authorization guard - Preview is faculty-only
   * Students should use "Take Quiz" instead
   */
  if (!isFaculty) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-warning">
          Preview is only available for faculty. Students should use the {"Take Quiz"} feature.
        </div>
        <Link href={`/Courses/${cid}/Quizzes/${qid}`} className="btn btn-primary">
          Back to Quiz
        </Link>
      </div>
    );
  }

  /**
   * Loading state - shows spinner while fetching quiz
   */
  if (loading) {
    return (
      <div className="container-fluid mt-4 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading quiz preview...</p>
      </div>
    );
  }

  /**
   * Error state - quiz not found
   */
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

  // ============================================================================
  // MAIN RENDER - QUIZ PREVIEW INTERFACE
  // ============================================================================

  return (
    <div className="container-fluid mt-4" style={{ maxWidth: "900px" }}>
      
      {/* 
        PREVIEW MODE BANNER
        Alert banner indicating this is preview mode (not saved)
        Includes "Edit Quiz" button for quick access to editor
      */}
      <div className="alert alert-info mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <FaEye className="me-2"></FaEye>
             <strong>Preview Mode</strong> - Your answers will not be saved
          </div>
           <Link 
            href={`/Courses/${cid}/Quizzes/${qid}/edit`}
            className="btn btn-sm btn-warning"
          >
            <FaEye className="bi bi-pencil me-2"></FaEye>
            Edit Quiz
          </Link> 
        </div>
       </div>


      {/* Quiz Title */}
      <h2 className="align-items-center mb-4">{quiz.title}</h2>

      {/* 
        QUIZ INSTRUCTIONS CARD
        Shows quiz description/instructions if available
      */}
      {quiz.description && (
        <div className="card mb-4 align-items-center">
          <div className="card-body">
            <h5 className="align-items-center card-title">Instructions</h5>
            <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
          </div>
        </div>
      )}

      {/* 
        QUIZ INFO CARDS
        Displays key quiz information in a row of cards
      */}
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
              <div className="fs-4 fw-bold">{quiz.questions?.length || 0}</div>
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

      {/* 
        QUESTIONS SECTION
        Renders all questions with appropriate input types
        Visual feedback after submission (green for correct, red for incorrect)
      */}
      {quiz.questions && quiz.questions.length > 0 ? (
        <div className="mb-4">
          {quiz.questions.map((question: any, index: number) => (
            <div 
              key={question._id} 
              className={`card mb-3 ${
                submitted && results?.questionResults[question._id]?.isCorrect 
                  ? 'border-success' 
                  : submitted && !results?.questionResults[question._id]?.isCorrect
                  ? 'border-danger'
                  : ''
              }`}
            >
              <div className="card-body">
                {/* Question Header */}
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="mb-0">
                    Question {index + 1}
                    {question.title && `: ${question.title}`}
                  </h5>
                  <span className="badge bg-secondary">{question.points} pts</span>
                </div>

                {/* Question Text */}
                <p className="mb-3">{question.question}</p>

                {/* Answer Options - Multiple Choice */}
                {question.type === "MULTIPLE_CHOICE" && (
                  <div>
                    {question.choices.map((choice: string, choiceIndex: number) => (
                      <div key={choiceIndex} className="form-check mb-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`question-${question._id}`}
                          id={`q${question._id}-choice${choiceIndex}`}
                          value={choice}
                          checked={answers[question._id] === choice}
                          onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                          disabled={submitted}
                        />
                        <label 
                          className={`form-check-label ${
                            submitted && question.correctAnswers.includes(choice)
                              ? 'text-success fw-bold'
                              : submitted && answers[question._id] === choice
                              ? 'text-danger'
                              : ''
                          }`}
                          htmlFor={`q${question._id}-choice${choiceIndex}`}
                        >
                          {choice}
                          {submitted && question.correctAnswers.includes(choice) && (
                            <i className="bi bi-check-circle-fill text-success ms-2"></i>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Answer Options - True/False */}
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
                          onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                          disabled={submitted}
                        />
                        <label 
                          className={`form-check-label ${
                            submitted && question.correctAnswers.includes(option)
                              ? 'text-success fw-bold'
                              : submitted && answers[question._id] === option
                              ? 'text-danger'
                              : ''
                          }`}
                          htmlFor={`q${question._id}-${option}`}
                        >
                          {option}
                          {submitted && question.correctAnswers.includes(option) && (
                            <i className="bi bi-check-circle-fill text-success ms-2"></i>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Answer Options - Fill in the Blank */}
                {question.type === "FILL_IN_BLANK" && (
                  <div>
                    <input
                      type="text"
                      className={`form-control ${
                        submitted 
                          ? results?.questionResults[question._id]?.isCorrect
                            ? 'is-valid'
                            : 'is-invalid'
                          : ''
                      }`}
                      placeholder="Type your answer here..."
                      value={answers[question._id] || ""}
                      onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                      disabled={submitted}
                    />
                    {submitted && (
                      <div className="form-text mt-2">
                        <strong>Possible correct answers:</strong> {question.correctAnswers.join(", ")}
                      </div>
                    )}
                  </div>
                )}

                {/* Result Badge */}
                {submitted && (
                  <div className="mt-3">
                    {results?.questionResults[question._id]?.isCorrect ? (
                      <div className="alert alert-success mb-0 py-2">
                        <i className="bi bi-check-circle me-2"></i>
                        Correct! Earned {question.points} points
                      </div>
                    ) : (
                      <div className="alert alert-danger mb-0 py-2">
                        <i className="bi bi-x-circle me-2"></i>
                        Incorrect. 0 points earned
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning">
          This quiz has no questions yet. Please add questions in the editor.
        </div>
      )}

      {/* Submit/Reset Buttons */}
      {quiz.questions && quiz.questions.length > 0 && (
        <div className="d-flex gap-2 mb-4">
          {!submitted ? (
            <>
              <button 
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
              >
                Submit Preview
              </button>
              <Link 
                href={`/Courses/${cid}/Quizzes/${qid}`}
                className="btn btn-outline-secondary btn-lg"
              >
                Cancel
              </Link>
            </>
          ) : (
            <>
              <button 
                className="btn btn-success btn-lg"
                onClick={handleReset}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>
                Try Again
              </button>
              <Link 
                href={`/Courses/${cid}/Quizzes/${qid}/edit`}
                className="btn btn-primary btn-lg"
              >
                <i className="bi bi-pencil me-2"></i>
                Edit Quiz
              </Link>
              <Link 
                href={`/Courses/${cid}/Quizzes/${qid}`}
                className="btn btn-outline-secondary btn-lg"
              >
                Back to Quiz
              </Link>
            </>
          )}
        </div>
      )}

      {/* Results Summary */}
      {submitted && results && (
        <div className="card border-primary mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              <i className="bi bi-bar-chart me-2"></i>
              Preview Results
            </h4>
          </div>
          <div className="card-body">
            <div className="row text-center g-3">
              <div className="col-md-4">
                <div className="p-3">
                  <div className="text-muted small">Your Score</div>
                  <div className="display-4 fw-bold text-primary">
                    {results.score}/{results.totalPoints}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3">
                  <div className="text-muted small">Percentage</div>
                  <div className="display-4 fw-bold text-primary">
                    {results.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="p-3">
                  <div className="text-muted small">Grade</div>
                  <div className="display-4 fw-bold text-primary">
                    {results.percentage >= 90 ? 'A' :
                     results.percentage >= 80 ? 'B' :
                     results.percentage >= 70 ? 'C' :
                     results.percentage >= 60 ? 'D' : 'F'}
                  </div>
                </div>
              </div>
            </div>
            
            <hr />
            
            <div className="alert alert-info mb-0">
              <i className="bi bi-info-circle me-2"></i>
              <strong>Remember:</strong> This is a preview only. No data has been saved.
              Scroll up to review each questions correctness.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}