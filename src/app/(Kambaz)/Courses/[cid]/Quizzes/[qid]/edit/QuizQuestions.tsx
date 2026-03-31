"use client";
import { IoIosAddCircleOutline } from "react-icons/io";
/**
 * QuizQuestions Component
 * 
 * Displays the Questions tab in the Quiz Editor
 * Shows a list of all questions for the current quiz with:
 * - Question number badge
 * - Question title
 * - Question type (Multiple Choice, True/False, Fill in Blank)
 * - Point value
 * - Question preview text
 * - Edit and Delete buttons
 * 
 * Also displays total points calculation for all questions
 */

/**
 * Props interface for QuizQuestions component
 * @param questions - Array of question objects from the quiz
 * @param onAddQuestion - Callback to open the new question modal
 * @param onEditQuestion - Callback to open edit modal with selected question
 * @param onDeleteQuestion - Callback to delete a question by ID
 */
interface QuizQuestionsTabProps {
  questions: any[];
  onAddQuestion: () => void;
  onEditQuestion: (question: any) => void;
  onDeleteQuestion: (questionId: string) => void;
}

export default function QuizQuestions({
  questions,
  onAddQuestion,
  onEditQuestion,
  onDeleteQuestion
}: QuizQuestionsTabProps) {
  
  /**
   * Converts backend question type enum to readable label
   * @param type - Backend question type (MULTIPLE_CHOICE, TRUE_FALSE, FILL_IN_BLANK)
   * @returns Human-readable label for display
   */
  const getQuestionTypeLabel = (type: string) => {
    switch(type) {
      case 'MULTIPLE_CHOICE': return 'Multiple Choice';
      case 'TRUE_FALSE': return 'True/False';
      case 'FILL_IN_BLANK': return 'Fill in the Blank';
      default: return type;
    }
  };

  return (
    <div>
      {/* Header with question count and New Question button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Questions ({questions.length})</h5>
        <button className="btn btn-primary" onClick={onAddQuestion}>
          <IoIosAddCircleOutline className="bi bi-plus-lg me-2"></IoIosAddCircleOutline>
          New Question
        </button>
      </div>

      {/* Question list or empty state */}
      {questions.length > 0 ? (
        <ul className="list-group">
          {/* Map through each question and render as list item */}
          {questions.map((question: any, index: number) => (
            <li key={question._id || index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-start">
                {/* Left side: Question info */}
                <div className="flex-grow-1">
                  {/* Question number badge and title */}
                  <div className="d-flex align-items-center mb-1">
                    <span className="badge bg-secondary me-2">Q{index + 1}</span>
                    <strong>{question.title || `Question ${index + 1}`}</strong>
                  </div>
                  
                  {/* Question metadata: type and points */}
                  <div className="text-muted small mb-2">
                    {getQuestionTypeLabel(question.type)} | {question.points} pts
                  </div>
                  
                  {/* Preview of question text (truncated to 100 chars) */}
                  {question.question && (
                    <div className="small text-secondary" style={{ maxWidth: '600px' }}>
                      {question.question.substring(0, 100)}
                      {question.question.length > 100 ? '...' : ''}
                    </div>
                  )}
                </div>
                
                {/* Right side: Action buttons */}
                <div className="d-flex gap-2">
                  {/* Edit button - opens modal with question data */}
                  <button 
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onEditQuestion(question)}
                  >
                    <i className="bi bi-pencil me-1"></i>
                    Edit
                  </button>
                  
                  {/* Delete button - confirms before deleting */}
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this question?')) {
                        onDeleteQuestion(question._id);
                      }
                    }}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        /* Empty state when no questions exist */
        <div className="alert alert-info">
          No questions yet. Click &quot; New Question&quot; to add questions to this quiz.
        </div>
      )}
      
      {/* Total points summary - only show if questions exist */}
      {questions.length > 0 && (
        <div className="mt-3 p-3 bg-light rounded">
          <strong>Total Points:</strong> {questions.reduce((sum, q) => sum + (q.points || 0), 0)}
        </div>
      )}
    </div>
  );
}