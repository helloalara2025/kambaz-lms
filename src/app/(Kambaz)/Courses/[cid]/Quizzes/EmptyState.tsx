"use client";

/**
 * Empty state when no quizzes exist
 * Shows different message for faculty vs students
 */
interface EmptyStateProps {
  isFaculty: boolean;
  onCreateQuiz: () => void;
}

export default function EmptyState({ 
  isFaculty, 
  onCreateQuiz 
}: EmptyStateProps) {
  return (
    <li className="list-group-item text-center py-5">
      {isFaculty ? (
        <>
          <p className="text-muted mb-2">No quizzes yet</p>
          <button className="btn btn-primary" onClick={onCreateQuiz}>
            <i className="bi bi-plus-lg"></i> Create Your First Quiz
          </button>
        </>
      ) : (
        <p className="text-muted">No quizzes available</p>
      )}
    </li>
  );
}