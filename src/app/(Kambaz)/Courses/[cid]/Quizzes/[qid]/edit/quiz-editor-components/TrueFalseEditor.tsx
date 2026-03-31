"use client";
import { FaTrash, FaPlus } from "react-icons/fa6";
import { FaInfoCircle, FaRegCheckCircle } from "react-icons/fa";
/**
 * ============================================================================
 * TRUE/FALSE EDITOR - Question type-specific component
 * ============================================================================
 * 
 * @description
 * Simple radio button interface for True/False questions.
 * Faculty selects whether the statement in the question is True or False.
 * 
 * @features
 * - Two large clickable cards (True and False)
 * - Radio button selection (only one can be correct)
 * - Visual indication with green border and badge on selected answer
 * - Entire card is clickable for better UX
 * 
 * @dataFlow
 * - Receives: correctAnswer (string: "True" or "False")
 * - Emits: onChange(correctAnswer) when selection changes
 * - Choices array is automatically set to ["True", "False"] in parent
 * 
 * ============================================================================
 */

/**
 * Props interface for TrueFalseEditor
 * 
 * @param correctAnswer - The correct answer: "True" or "False"
 * @param onChange - Callback to update parent state with new selection
 */
interface TrueFalseEditorProps {
  correctAnswer: string;
  onChange: (correctAnswer: string) => void;
}

export default function TrueFalseEditor({
  correctAnswer,
  onChange
}: TrueFalseEditorProps) {

  // ============================================================================
  // COMPUTED VALUE
  // ============================================================================
  
  /**
   * Check if "True" is the correct answer
   * Used to determine which card should be highlighted
   */
  const isTrue = correctAnswer === "True";
  
  return (
    <div>
      <label className="form-label fw-semibold mb-3">Correct Answer</label>
      
      {/* 
        TWO-COLUMN LAYOUT
        Side-by-side cards for True and False
      */}
      <div className="d-flex gap-3">

        {/* 
          TRUE CARD
          - Entire card is clickable
          - Green border when selected (isTrue === true)
          - Radio button for accessibility
          - Green badge shown when selected
        */}
        <div 
          className={`card p-3 flex-grow-1 cursor-pointer ${isTrue ? 'border-success border-2' : ''}`}
          onClick={() => onChange("True")}
          style={{ cursor: 'pointer' }}
        >

          {/* Radio button for "True" */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="trueFalse"
              id="answerTrue"
              checked={isTrue}
              onChange={() => onChange("True")}
            />
            <label className="form-check-label fw-semibold" htmlFor="answerTrue">
              True
            </label>
          </div>

          {/* 
            CORRECT BADGE
            Only shown when True is the correct answer
          */}
          {isTrue && (
            <div className="mt-2">
              <span className="badge bg-success">
                <FaRegCheckCircle className="bi bi-check-circle me-1"></FaRegCheckCircle>
                Correct Answer
              </span>
            </div>
          )}
        </div>

            {/* 
          FALSE CARD
          - Entire card is clickable
          - Green border when selected (isTrue === false)
          - Radio button for accessibility
          - Green badge shown when selected
        */}
        <div 
          className={`card p-3 flex-grow-1 cursor-pointer ${!isTrue ? 'border-success border-2' : ''}`}
          onClick={() => onChange("False")}
          style={{ cursor: 'pointer' }}
        >
          {/* Radio button for "False" */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="trueFalse"
              id="answerFalse"
              checked={!isTrue}
              onChange={() => onChange("False")}
            />
            <label className="form-check-label fw-semibold" htmlFor="answerFalse">
              False
            </label>
          </div>

          {/* 
            CORRECT BADGE
            Only shown when False is the correct answer
          */}
          {!isTrue && (
            <div className="mt-2">
              <span className="badge bg-success">
                <FaRegCheckCircle className="bi bi-check-circle me-1"></FaRegCheckCircle>
                Correct Answer
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 
        HELP TEXT
        Explains what faculty is selecting
      */}
      <div className="alert alert-info mt-3 small">
        <FaInfoCircle className="bi bi-info-circle me-2"></FaInfoCircle>
        Select whether the statement in the question is True or False.
      </div>
    </div>
  );
}