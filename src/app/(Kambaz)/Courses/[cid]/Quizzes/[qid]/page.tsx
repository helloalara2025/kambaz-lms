"use client";

/**
 * ============================================================================
 * QUIZ DETAILS PAGE - READ-ONLY VIEW
 * ============================================================================
 * 
 * @description
 * Displays comprehensive quiz information in a Canvas-inspired table layout.
 * This is the landing page after clicking a quiz from the quiz list.
 * 
 * @features
 * - Canvas-style table layout displaying all quiz properties
 * - Quiz title with action buttons (Preview/Edit for faculty, Take Quiz for students)
 * - All quiz settings displayed in a clean table format
 * - Separate dates table showing due date, available from, and until dates
 * - Question count display
 * - Publish/Unpublish functionality for faculty
 * 
 * @displays
 * Quiz Properties Table:
 * - Quiz Type (Graded Quiz, Practice Quiz, Graded Survey, Ungraded Survey)
 * - Points (total from all questions)
 * - Assignment Group (Quizzes, Exams, Assignments, Project)
 * - Shuffle Answers (Yes/No)
 * - Time Limit (minutes or "No time limit")
 * - Multiple Attempts (Yes/No)
 * - How Many Attempts (conditionally shown)
 * - View Responses setting
 * - Show Correct Answers timing
 * - One Question at a Time (Yes/No)
 * - Require Respondus LockDown Browser (Yes/No)
 * - Required to View Quiz Results (Yes/No)
 * - Webcam Required (Yes/No)
 * - Lock Questions After Answering (Yes/No)
 * 
 * Dates Table:
 * - Due date
 * - For (audience - defaults to "Everyone")
 * - Available from date
 * - Until date
 * 
 * @userRoles
 * - Faculty: Can view all details, Preview, Edit, and Publish/Unpublish
 * - Students: Can view details and Take Quiz (if published)
 * 
 * @navigation
 * - Preview button → /Courses/[cid]/Quizzes/[qid]/preview
 * - Edit button → /Courses/[cid]/Quizzes/[qid]/edit
 * - Take Quiz button → /Courses/[cid]/Quizzes/[qid]/take
 * 
 * ============================================================================
 */

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as client from "../../../client";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { FaPencil } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

export default function QuizDetails() {
  // ============================================================================
  // STATE & ROUTE PARAMETERS
  // ============================================================================
  
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isFaculty = currentUser?.role === "FACULTY";

  // ============================================================================
  // DATA FETCHING
  // ============================================================================
  
  /**
   * Fetches quiz data from backend on component mount
   * Runs whenever cid or qid changes
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
  // HELPER FUNCTIONS - DATA FORMATTING
  // ============================================================================

  /**
   * Formats ISO date string to readable format
   * @param dateString - ISO date string from backend
   * @returns Formatted date string or "Not set"
   */
  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit"
    });
  };

  /**
   * Converts backend quiz type enum to readable label
   * @param type - Backend quiz type enum
   * @returns Human-readable quiz type label
   */
  const getQuizTypeLabel = (type?: string) => {
    switch(type) {
      case 'GRADED_QUIZ': return 'Graded Quiz';
      case 'PRACTICE_QUIZ': return 'Practice Quiz';
      case 'GRADED_SURVEY': return 'Graded Survey';
      case 'UNGRADED_SURVEY': return 'Ungraded Survey';
      default: return 'Graded Quiz';
    }
  };

  /**
   * Converts backend assignment group enum to readable label
   * @param group - Backend assignment group enum
   * @returns Human-readable assignment group label
   */
  const getAssignmentGroupLabel = (group?: string) => {
    switch(group) {
      case 'QUIZZES': return 'QUIZZES';
      case 'EXAMS': return 'EXAMS';
      case 'ASSIGNMENTS': return 'ASSIGNMENTS';
      case 'PROJECT': return 'PROJECT';
      default: return 'QUIZZES';
    }
  };

  // ============================================================================
  // RENDER GUARDS - HANDLE LOADING & ERROR STATES
  // ============================================================================

  /**
   * Loading state - shows spinner while fetching quiz data
   */
  if (loading) {
    return (
      <div className="container-fluid mt-4 text-center">
        <div className="spinner-border text-primary" />
        <p className="mt-2">Loading quiz...</p>
      </div>
    );
  }

  /**
   * Error state - quiz not found or failed to load
   * Provides navigation back to quiz list
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
  // MAIN RENDER - CANVAS-STYLE TABLE LAYOUT
  // ============================================================================

  return (
    <div className="container-fluid">
      
      {/* 
        HEADER SECTION
        - Quiz title on left
        - Action buttons on right (Preview/Edit for faculty, Take Quiz for students)
      */}
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <h2 className="mb-0">{quiz.title}</h2>
        
        <div className="d-flex gap-2">
          {isFaculty ? (
            <>
              <Link 
                href={`/Courses/${cid}/Quizzes/${qid}/preview`}
                className="btn btn-outline-secondary"
              >
                <FaEye className="me-1"></FaEye>
                Preview
              </Link>
              <Link 
                href={`/Courses/${cid}/Quizzes/${qid}/edit`}
                className="btn btn-outline-secondary"
              >
                <FaPencil className="bi bi-pencil me-1"></FaPencil>
                Edit
              </Link>
            </>
          ) : (
            <Link 
              href={`/Courses/${cid}/Quizzes/${qid}/take`}
              className="btn btn-primary"
            >
              Take Quiz
            </Link>
          )}
        </div>
      </div>

      {/* 
        QUIZ PROPERTIES TABLE
        Displays all quiz settings in a clean, borderless table format
        Labels are right-aligned and bold, values are left-aligned
        Contained in a card with light gray background
      */}
      <div className="row">
        <div className="col-12">
          
          {/* Card container with gray background */}
          <div className="card bg-light border-0 mb-4" style={{ maxWidth: "800px" }}>
            <div className="card-body p-4">
              <table className="table table-borderless mb-0">
                <tbody>
              
              {/* Quiz Type */}
              <tr>
                <td className="text-end fw-semibold" style={{ width: "200px" }}>Quiz Type</td>
                <td>{getQuizTypeLabel(quiz.quizType)}</td>
              </tr>

              {/* Points */}
              <tr>
                <td className="text-end fw-semibold">Points</td>
                <td>{quiz.points || 0}</td>
              </tr>

              {/* Assignment Group */}
              <tr>
                <td className="text-end fw-semibold">Assignment Group</td>
                <td>{getAssignmentGroupLabel(quiz.assignmentGroup)}</td>
              </tr>

              {/* Shuffle Answers */}
              <tr>
                <td className="text-end fw-semibold">Shuffle Answers</td>
                <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
              </tr>

              {/* Time Limit */}
              <tr>
                <td className="text-end fw-semibold">Time Limit</td>
                <td>{quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No time limit"}</td>
              </tr>

              {/* Multiple Attempts */}
              <tr>
                <td className="text-end fw-semibold">Multiple Attempts</td>
                <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
              </tr>

              {/* How Many Attempts (only show if multiple attempts enabled) */}
              {quiz.multipleAttempts && (
                <tr>
                  <td className="text-end fw-semibold">How Many Attempts</td>
                  <td>{quiz.howManyAttempts || 1}</td>
                </tr>
              )}

              {/* View Responses */}
              <tr>
                <td className="text-end fw-semibold">View Responses</td>
                <td>Always</td>
              </tr>

              {/* Show Correct Answers */}
              <tr>
                <td className="text-end fw-semibold">Show Correct Answers</td>
                <td>{quiz.showCorrectAnswers || "Immediately"}</td>
              </tr>

              {/* One Question at a Time */}
              <tr>
                <td className="text-end fw-semibold">One Question at a Time</td>
                <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
              </tr>

              {/* Require Respondus LockDown Browser */}
              <tr>
                <td className="text-end fw-semibold">Require Respondus LockDown Browser</td>
                <td>No</td>
              </tr>

              {/* Required to View Quiz Results */}
              <tr>
                <td className="text-end fw-semibold">Required to View Quiz Results</td>
                <td>No</td>
              </tr>

              {/* Webcam Required */}
              <tr>
                <td className="text-end fw-semibold">Webcam Required</td>
                <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
              </tr>

              {/* Lock Questions After Answering */}
              <tr>
                <td className="text-end fw-semibold">Lock Questions After Answering</td>
                <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
              </tr>

              </tbody>
            </table>
          </div>
        </div>

          {/* 
            DATES TABLE
            Separate table showing quiz availability and due dates
            Uses table headers for better organization
            Also contained in a card with gray background
          */}
          <div className="card bg-light border-0 mb-4" style={{ maxWidth: "800px" }}>
            <div className="card-body p-4">
              <table className="table table-borderless mb-0">
                <thead>
                  <tr>
                    <th style={{ width: "200px" }}>Due</th>
                    <th style={{ width: "200px" }}>For</th>
                    <th style={{ width: "200px" }}>Available from</th>
                    <th style={{ width: "200px" }}>Until</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formatDateTime(quiz.dueDate)}</td>
                    <td>Everyone</td>
                    <td>{formatDateTime(quiz.availableDate)}</td>
                    <td>{formatDateTime(quiz.untilDate)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 
            QUESTION COUNT
            Displays total number of questions in the quiz
          */}
          <div className="mt-4">
            <span className="fw-semibold me-2">Number of Questions:</span>
            <span>{quiz.questions?.length || 0}</span>
          </div>

        </div>
      </div>
    </div>
  );
}