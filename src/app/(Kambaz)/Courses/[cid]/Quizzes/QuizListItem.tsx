"use client";
/**
 * ============================================================================
 * QUIZ LIST ITEM - Individual quiz row component
 * ============================================================================
 * 
 * @description
 * Renders a single quiz in the quiz list with all metadata and action buttons.
 * Adapts display based on user role (faculty vs student).
 * 
 * @displays
 * - Drag handle (faculty only)
 * - Rocket icon
 * - Quiz title (clickable - links to different pages based on role)
 * - Metadata: Availability status, due date, points, question count
 * - Publish/Unpublish toggle button (faculty only)
 * - 3-dot dropdown menu with Edit/Delete/Publish/Preview (faculty only)
 * - Score and attempt count (students only)
 * 
 * @links
 * - Faculty title click → Quiz details page
 * - Student title click → Take quiz page
 * - Faculty edit → Quiz editor
 * - Faculty preview → Preview mode
 * 
 * ============================================================================
 */


import Link from "next/link";
import { Dropdown } from "react-bootstrap";
import { IoEllipsisVertical, IoRocket } from "react-icons/io5";
import { FaCheckCircle, FaBan, FaPencilAlt } from "react-icons/fa";
import { FcDeleteDatabase } from "react-icons/fc";
import { MdPublish, MdPreview } from "react-icons/md";

/**
 * Individual quiz item in the list
 * Displays quiz info and faculty action buttons
 */
interface QuizListItemProps {
  quiz: any;
  cid: string;
  isFaculty: boolean;
  isStudent: boolean;
  onDelete: (quizId: string) => void;
  onTogglePublish: (quiz: any) => void;
  getAvailabilityStatus: (quiz: any) => string;
}

export default function QuizListItem({
  quiz,
  cid,
  isFaculty,
  isStudent,
  onDelete,
  onTogglePublish,
  getAvailabilityStatus
}: QuizListItemProps) {
  return (
    <li className="list-group-item d-flex align-items-start py-3 px-2">
      {/* Drag handle (FACULTY only) */}
      {isFaculty && (
        <i className="bi bi-grip-vertical text-muted me-3 mt-2"></i>
      )}

      {/* Quiz icon left of Quiz tit.e */}
      <IoRocket
        className="bi bi-rocket-takeoff text-primary me-3 mt-2"
        style={{ fontSize: "1.5rem" }}
      ></IoRocket>

      {/* Quiz title + metadata */}
      <div className="flex-grow-1">
        {/* quiz details (or Take view for students) */}
        <Link
          href={
            isFaculty
              ? `/Courses/${cid}/Quizzes/${quiz._id}` // Details view
              : `/Courses/${cid}/Quizzes/${quiz._id}/take` // Take quiz (Mock student view)
          }
          className="fw-bold text-dark text-decoration-none"
        >
          {quiz.title}
        </Link>

        {/* Metadata: availability, due, points, questions */}
        <div className="text-muted small mt-1">
          <span className="me-3">
            <strong>{getAvailabilityStatus(quiz)}</strong>
          </span>
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
          {/* Publish/Unpublish toggle - outside dropdown clickable */}
          <button
            className="btn btn-link text-decoration-none p-0 me-2"
            onClick={() => onTogglePublish(quiz)}
            title={quiz.published ? "Click to unpublish" : "Click to publish"}
          >
            {quiz.published ? (
              <FaCheckCircle className="text-success fs-3"></FaCheckCircle>
            ) : (
              <FaBan className="text-secondary fs-3"></FaBan>
            )}
          </button>

          {/* Delete Button inside Quiz  3-dots dropdown menu */}
          <Dropdown>
            <Dropdown.Toggle
              variant="link"
              className="text-dark p-0 border-0 bg-transparent"
              style={{ boxShadow: "none" }}
              id={`dropdown-${quiz._id}`}
            >
              <IoEllipsisVertical className="fs-4" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              {/* Edit - Blue button */}
              <Dropdown.Item
                as={Link}
                href={`/Courses/${cid}/Quizzes/${quiz._id}/edit`}
              >
                <FaPencilAlt className="me-2 text-primary"></FaPencilAlt>
                Edit
              </Dropdown.Item>

              {/* Delete Red */}
              <Dropdown.Item onClick={() => onDelete(quiz._id)}>
                <FcDeleteDatabase className="me-2 text-danger"></FcDeleteDatabase>
                Delete
              </Dropdown.Item>

              {/* 
                PUBLISH/UNPUBLISH - Same action as toggle button
                Green for publish, yellow for unpublish
                Provides alternative access to publish function
              */}
              <Dropdown.Item onClick={() => onTogglePublish(quiz)}>
                <MdPublish
                  className={`bi ${
                    quiz.published
                      ? "bi-x-circle text-warning"  // Unpublish (yellow)
                      : "bi-check-circle text-success" // Publish (green)
                  } me-2`}
                ></MdPublish>
                {quiz.published ? "Unpublish" : "Publish"}
              </Dropdown.Item>
              
               {/* Divider line for visual separation */}
              <Dropdown.Divider />

              {/* Preview  - Purple eye icon, opens preview mode */}
              <Dropdown.Item
                as={Link}
                href={`/Courses/${cid}/Quizzes/${quiz._id}/preview`}
              >
                <MdPreview className="bi bi-eye me-2 text-info"></MdPreview>
                Preview
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      )}

        {/* 
        STUDENT SCORE INFO
        Only shown for students, displays their performance
        Shows: Score and number of attempts
      */}
      {isStudent && (
        <div className="text-muted small mt-1">
          Score: {quiz.latestScore != null ? quiz.latestScore : "—"}
          {" · "}
          Attempts: {quiz.attemptCount ?? 0}
        </div>
      )}
    </li>
  );
}