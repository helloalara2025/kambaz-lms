"use client";
/**
 * ============================================================================
 * QUIZZES PAGE - Main quiz list view
 * ============================================================================
 * 
 * @description
 * Central hub for all quiz operations in a course. Displays quiz list with
 * search/filter capabilities and provides different views for faculty vs students.
 * 
 * @features
 * - Faculty: Full CRUD operations, publish/unpublish, student view preview
 * - Students: View published quizzes only, see scores and attempts
 * - Search quizzes by title
 * - Empty state prompting to create first quiz
 * - Loading states and error handling
 * 
 * @routes
 * - Faculty clicking quiz title → /Courses/[cid]/Quizzes/[qid] (details view)
 * - Student clicking quiz title → /Courses/[cid]/Quizzes/[qid]/take (quiz taking)
 * - Create quiz → /Courses/[cid]/Quizzes/[qid]/edit (editor)
 * 
 * @permissions
 * - Faculty: Can view all quizzes, create, edit, delete, publish
 * - Students: Can only view published quizzes and take them
 * ============================================================================
 */

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as client from "../../client";
import { toast } from 'react-toastify'; // Toast notifications

// Component improts
import QuizzesControls from "./QuizzesControls";
import QuizListItem from "./QuizListItem";
import EmptyState from "./EmptyState";
import { getAvailabilityStatus, filterQuizzes } from "./quizUtils";

// Redux imports 
import { setQuizzes, deleteQuiz as deleteQuizAction } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";


export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();

  // Redux state
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const isFaculty = currentUser?.role === "FACULTY";
  const isStudent = currentUser?.role === "STUDENT";

  const displayFacultyStudent = isFaculty && !isPreviewing;

  /* Load quizzes from backend */
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const data = await client.findQuizzesForCourse(cid as string);
        // Sort by available date
        dispatch(setQuizzes(data));
      } catch (e) {
        console.error("Failed to load quizzes:", e);
      } finally {
        // Always turn off loading, even if fetch failed
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [cid, dispatch]); // Re-run if course ID or dispatch function changes

    /**
   * CREATE QUIZ
   * Creates a new quiz with default values and navigates to editor
   * 
   * @workflow
   * 1. Call backend API to create quiz in database
   * 2. Add new quiz to Redux store
   * 3. Show success notification
   * 4. Navigate to quiz editor for the new quiz
   */
  const handleCreateQuiz = async () => {
    try {
      const newQuiz = await client.createQuiz(cid as string, {
        title: "New Quiz",
        published: false,
        availableDate: null,
        untilDate: null,
        dueDate: null,
        points: 0,
        questions: [],
      });
      // Add to local Redux store immediately
      dispatch(setQuizzes([...quizzes, newQuiz]));
      
      // User feedback
      toast.success("Quiz created!");
      // Navigate to editor
      router.push(`/Courses/${cid}/Quizzes/${newQuiz._id}/edit`);
    } catch (e) {
      console.error("Failed to create quiz:", e);
        toast.error("Failed to create quiz");
    }
  };

   /**
   * DELETE QUIZ
   * Removes a quiz from the database and local state
   * 
   * @param quizId - MongoDB _id of the quiz to delete
   * 
   * @workflow
   * 1. Show confirmation dialog (prevent accidents)
   * 2. Call backend API to delete from database
   * 3. Remove from Redux store
   * 4. Show success notification
   */
  const handleDeleteQuiz = async (quizId: string) => {
     // Confirm before deleting -- prevents accidents)
    if (!confirm("Delete this quiz?")) 
      return;
    try {
      // Delete from backend database
      await client.deleteQuiz(cid as string, quizId);
      // Remove from local Redux store
      dispatch(deleteQuizAction(quizId));
      // User feedback
      toast.success("Quiz deleted!");
    } catch (e) {
      console.error("Failed to delete quiz:", e);
      toast.error("Failed to delete quiz");
    }
  };

  /**
   * TOGGLE PUBLISH STATUS
   * Switches quiz between published (visible to students) and unpublished
   * 
   * @param quiz - The quiz object to toggle
   * 
   * @workflow
   * 1. Call backend API to toggle published status
   * 2. Re-fetch all quizzes to ensure data is fresh
   * 3. Update Redux store with new data
   * 4. Show appropriate success message
   */
  const togglePublish = async (quiz: any) => {
    try {
      // Backend toggles the published boolean status
      await client.publishQuiz(cid as string, quiz._id);

      // Re-fetch updated quizzes list for state consistency
      const updatedQuizzes = await client.findQuizzesForCourse(cid as string);
      // Update Redux store and display notification
      dispatch(setQuizzes(updatedQuizzes));
      toast.success(quiz.published ? "Quiz unpublished" : "Quiz published" );
    } catch (error) {
      console.error("Failed to toggle publish:", error);
      toast.error("Failed to update quiz");
    }
  };

  // ============================================================================
  // COMPUTED DATA - Filtered quiz list
  // ============================================================================

  /**
   * Filter quizzes based on:
   * 1. Search term (filters by title)
   * 2. User role (students only see published quizzes)
   * 
   * @see quizUtils.ts for implementation
   */
  const displayQuizzes = filterQuizzes(quizzes, searchTerm, displayFacultyStudent);

  // ============================================================================
  // RENDER GUARDS - Handle edge cases before main render
  // ============================================================================

    /**
   * GUARD 1: Missing course ID
   * Shouldn't happen in normal flow, but prevents crashes
   */
  if (!cid) {
    return (
      <div className="container-fluid mt-4">
        <div className="alert alert-warning">
          No course selected. Please select a course from the Dashboard.
        </div>
      </div>
    );
  }

      /**
   * GUARD 2: Loading state
   * Show spinner while fetching data from backend
   * Shouldn't happen in normal flow, but prevents crashes.
   */
    if (loading) {
      return (
    <div className="container-fluid mt-4 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-2">Loading quizzes...</p>
    </div>
      );
    }
    
  // ============================================================================
  // MAIN RENDER - Quiz list with controls
  // ============================================================================

  return (
    <div className="container-fluid" id="wd-quizzes">

        {/* 
        CONTROLS BAR
        - Search input with Search/Clear buttons
        - Student View toggle (faculty only)
        - + Quiz button (faculty only)
        - 3-dot menu with additional options (faculty only)
      */}
      <QuizzesControls
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      addQuiz={handleCreateQuiz}
      isFaculty={isFaculty}
      isPreviewing={isPreviewing}
      setIsPreviewing={setIsPreviewing}
      />

      {/* Quiz list container */}
      <ul className="list-group">

        {/* Section label with grip handle icon */}
        <li className="list-group-item bg-light border-0">
          <h5 className="mb-0">
            <i className="bi bi-grip-vertical me-2"></i>
            Assignment Quizzes
          </h5>
        </li>

         {/* 
          CONDITIONAL RENDERING:
          - If no quizzes match filters: Show empty state
          - Otherwise: Map through filtered quizzes and render each
        */}
        {displayQuizzes.length === 0 ? (
          /* Empty state with different messages for faculty vs students */
          <EmptyState
          isFaculty={displayFacultyStudent}
          onCreateQuiz={handleCreateQuiz}
          />
        ) : (
          /* Map through each quiz and render as list item */
          /* quiz item rows*/
          displayQuizzes.map((quiz: any) => (
            <QuizListItem
            key={quiz._id}
            quiz={quiz}
            cid={cid as string}
            isFaculty={displayFacultyStudent}
            isStudent={isStudent}
            onDelete={handleDeleteQuiz}
            onTogglePublish={togglePublish}
            getAvailabilityStatus={getAvailabilityStatus}
            />
          ))
        )}
        </ul>
        </div>
  ); 
}