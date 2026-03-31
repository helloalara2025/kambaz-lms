"use client";
import { FaTrash, FaPlus } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
/**
 * ============================================================================
 * FILL IN THE BLANK EDITOR - Question type-specific component
 * ============================================================================
 * 
 * @description
 * Manages possible correct answers for fill-in-the-blank questions.
 * Allows faculty to specify multiple acceptable answer variations.
 * 
 * @features
 * - Add/remove possible answers (minimum 1 required)
 * - Simple text input for each answer
 * - Supports multiple answer variations (e.g., "color", "colour")
 * - Backend handles case-insensitive matching automatically
 * 
 * @dataFlow
 * - Receives: correctAnswers (array of strings)
 * - Emits: onChange(correctAnswers) whenever answers change
 * - No "choices" array needed (students type their answer)
 * 
 * @example
 * Question: "What is the capital of France?"
 * Possible answers: ["Paris", "paris", "PARIS"]
 * Student can type any variation and it will be accepted
 * 
 * ============================================================================
 */

/**
 * Props interface for FillBlankEditor
 * 
 * @param correctAnswers - Array of acceptable answer strings
 * @param onChange - Callback to update parent state with new answers
 */
interface FillBlankEditorProps {
  correctAnswers: string[];
  onChange: (correctAnswers: string[]) => void;
}

export default function FillBlankEditor({
  correctAnswers,
  onChange
}: FillBlankEditorProps) {

  // ============================================================================
  // EVENT HANDLERS - Answer Management
  // ============================================================================

  /**
   * ADD ANSWER
   * Adds a new empty answer slot to the list
   * Used when faculty clicks "Add Another Answer" button
   */
  const addAnswer = () => {
    // Spread existing answers and add empty string
    onChange([...correctAnswers, ""]);
  };

  /**
   * REMOVE ANSWER
   * Deletes an answer at the specified index
   * 
   * @param index - Position of answer to remove
   * 
   * @validation
   * - Prevents deletion if only 1 answer remains (minimum required)
   * - Students need at least one acceptable answer to match
   * 
   * @workflow
   * 1. Check minimum answer count (1)
   * 2. Filter out the answer at the specified index
   * 3. Call onChange with updated array
   */
  const removeAnswer = (index: number) => {
    // Enforce min of 1 answer
    if (correctAnswers.length <= 1) {
      alert("You must have at least 1 possible answer");
      return;
    }
    // Remove from correct answers array
    onChange(correctAnswers.filter((_, i) => i !== index));
  };

   /**
   * UPDATE ANSWER TEXT
   * Updates the text content of an answer at the specified index
   * 
   * @param index - Position of answer to update
   * @param value - New text for the answer
   * 
   * @workflow
   * 1. Map through correctAnswers array
   * 2. Replace text at specified index
   * 3. Call onChange with updated array
   */
  const updateAnswer = (index: number, value: string) => {
    // Create new array with updated answer at index
    const updated = correctAnswers.map((answer, i) => 
      i === index ? value : answer
    );
    // Update parent state
    onChange(updated);
  };

  // ============================================================================
  // RENDER - Answer list with add button
  // ============================================================================
  return (
    <div>
      {/* Section label */}
      <label className="form-label fw-semibold mb-3">Possible Correct Answers</label>
      
        {/* 
        ANSWERS LIST
        Maps through all possible answers and renders each with:
        - Text input field
        - Delete button
      */}
      <div className="mb-3">
        {correctAnswers.map((answer, index) => (
          <div key={index} className="mb-2 d-flex gap-2 align-items-center">
            
              {/* 
              ANSWER TEXT INPUT
              Simple text input for each possible answer
              Updates as faculty types
            */}
            <input
              type="text"
              className="form-control"
              value={answer}
              onChange={(e) => updateAnswer(index, e.target.value)}
              placeholder={`Possible answer ${index + 1}`}
            />

            {/* 
              DELETE BUTTON
              Removes this answer from the list
              Disabled when only 1 answer remains (minimum required)
            */}
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => removeAnswer(index)}
              disabled={correctAnswers.length <= 1}
            >
              <FaTrash className="bi bi-trash"></FaTrash>
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-sm btn-outline-primary mb-3"
        onClick={addAnswer}
      >
        <FaPlus className="bi bi-plus-lg me-1"></FaPlus>
        Add Another Answer
      </button>

      <div className="alert alert-info small">
        <FaInfoCircle className="bi bi-info-circle me-2"></FaInfoCircle>
        Students can provide any of these answers. Add multiple variations to accept different correct responses.
        <div className="mt-2">
          <strong>Note:</strong> Your backend handles case-insensitive matching automatically.
        </div>
      </div>
    </div>
  );
}