"use client";
import { FaTrash, FaPlus } from "react-icons/fa6";
import { FaInfoCircle, FaRegCheckCircle } from "react-icons/fa";
/**
 * ============================================================================
 * MULTIPLE CHOICE EDITOR - Question type-specific component
 * ============================================================================
 *
 * @description
 * Manages answer choices for multiple choice questions. Allows faculty to:
 * - Add/remove answer choices (minimum 2 required)
 * - Mark one or more answers as correct
 * - Edit answer text for each choice
 *
 * @features
 * - Dynamic choice management (add/remove with validation)
 * - Checkbox to mark correct answers (supports multiple correct answers)
 * - Visual indication of correct answers with green badge
 * - Delete protection (prevents removing below 2 choices)
 * - Auto-cleanup of correct answers when choices are deleted
 *
 * @dataFlow
 * - Receives: choices (array of strings), correctAnswers (array of strings)
 * - Emits: onChange(choices, correctAnswers) whenever data changes
 * - Parent component (QuestionEditor) manages the state
 *
 * ============================================================================
 */

/**
 * Props interface for MultipleChoiceEditor
 *
 * @param choices - Array of answer choice text strings
 * @param correctAnswers - Array of correct answer strings (subset of choices)
 * @param onChange - Callback to update parent state with new choices and correct answers
 */
interface MultipleChoiceEditorProps {
  choices: string[];
  correctAnswers: string[];
  onChange: (choices: string[], correctAnswers: string[]) => void;
}

export default function MultipleChoiceEditor({
  choices,
  correctAnswers,
  onChange,
}: MultipleChoiceEditorProps) {
  const addChoice = () => {
    onChange([...choices, ""], correctAnswers);
  };

  /**
   * REMOVE CHOICE
   * Deletes a choice at the specified index
   *
   * @param index - Position of choice to remove in choices array
   *
   * @validation
   * - Prevents deletion if only 2 choices remain (minimum required)
   * - Auto-removes from correctAnswers if it was marked correct
   *
   * @workflow
   * 1. Check minimum choice count (2)
   * 2. Store the text of the choice being removed
   * 3. Filter out the choice from choices array
   * 4. Clean up correctAnswers array (remove if present)
   * 5. Call onChange with updated arrays
   */
  const removeChoice = (index: number) => {
    // Enforce minimum of 2 choices
    if (choices.length <= 2) {
      alert("You must have at least 2 answer choices");
      return;
    }
    // Store the text before removing (needed to clean up correctAnswers)
    const removedChoice = choices[index];
    // Remove from choices array
    const newChoices = choices.filter((_, i) => i !== index);

    // Remove from correctAnswers if it was selected to prevent orphaned correct answers not matching any choice
    const newCorrectAnswers = correctAnswers.filter((a) => a !== removedChoice);
    // Update parent state
    onChange(newChoices, newCorrectAnswers);
  };

  /**
   * UPDATE CHOICE TEXT
   * Updates the text content of a choice at the specified index
   *
   * @param index - Position of choice to update
   * @param value - New text for the choice
   *
   * @sideEffects
   * If this choice was marked correct, updates correctAnswers array
   * to reflect the new text (maintains correctness marking)
   *
   * @workflow
   * 1. Store old value (before update)
   * 2. Create new choices array with updated text
   * 3. Update correctAnswers array if this choice was marked correct
   *    (replaces old text with new text)
   * 4. Call onChange with updated arrays
   */
  const updateChoice = (index: number, value: string) => {
    // Store old value for correctAnswers update
    const oldValue = choices[index];
    // Update choices array
    const newChoices = choices.map((choice, i) =>
      i === index ? value : choice
    );

    // If this choice was in correctAnswers, update it there too
    // This maintains the "correct" marking even when text changes
    const newCorrectAnswers = correctAnswers.map((answer) =>
      answer === oldValue ? value : answer
    );
    // Update parent state
    onChange(newChoices, newCorrectAnswers);
  };

  /**
   * TOGGLE CORRECT STATUS
   * Marks or unmarks a choice as correct
   *
   * @param choiceValue - The text of the choice to toggle
   *
   * @behavior
   * - If currently correct: Remove from correctAnswers
   * - If currently incorrect: Add to correctAnswers
   * - Supports multiple correct answers (checkbox, not radio)
   *
   * @workflow
   * 1. Check if choice is currently in correctAnswers array
   * 2. If correct: Filter it out
   * 3. If incorrect: Add it to array
   * 4. Call onChange with updated correctAnswers
   */
  const toggleCorrect = (choiceValue: string) => {
    // Check current state
    const isCurrentlyCorrect = correctAnswers.includes(choiceValue);

    // Toggle correct status
    if (isCurrentlyCorrect) {
      // Remove from correct answers (uncheck)
      const newCorrectAnswers = correctAnswers.filter((a) => a !== choiceValue);
      onChange(choices, newCorrectAnswers);
    } else {
      // Add to correct answers
      onChange(choices, [...correctAnswers, choiceValue]);
    }
  };

  // ============================================================================
  // RENDER - Choice list with add button
  // ============================================================================
  return (
    <div>
      {/* Section label */}
      <label className="form-label fw-semibold mb-3">Answer Choices</label>

      {/* 
        CHOICES LIST
        Maps through all choices and renders each with:
        - Correct checkbox
        - Text input
        - Delete button
      */}
      <div className="mb-3">
        {choices.map((choice, index) => {
          // Check if this choice is marked correct
          const isCorrect = correctAnswers.includes(choice);

          return (
            <div key={index} className="mb-3 p-3 border rounded bg-light">
              <div className="d-flex align-items-start gap-3">
                {/* 
                  CORRECT CHECKBOX
                  Marks this choice as correct/incorrect
                  Calls toggleCorrect when clicked
                */}
                <div className="form-check mt-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`choice-${index}`}
                    checked={isCorrect}
                    onChange={() => toggleCorrect(choice)}
                  />
                  <label
                    className="form-check-label small text-muted"
                    htmlFor={`choice-${index}`}
                  >
                    Correct
                  </label>
                </div>

                {/* 
                  CHOICE TEXT INPUT
                  Textarea allows multi-line answer text
                  Updates as faculty types
                */}
                <div className="flex-grow-1">
                  <textarea
                    className="form-control"
                    rows={2}
                    value={choice}
                    onChange={(e) => updateChoice(index, e.target.value)}
                    placeholder={`Answer choice ${index + 1}`}
                  />
                </div>

                {/* 
                  DELETE BUTTON
                  Removes this choice from the list
                  Disabled when only 2 choices remain (minimum required)
                */}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeChoice(index)}
                  disabled={choices.length <= 2}
                >
                  <FaTrash className="bi bi-trash"></FaTrash>
                </button>
              </div>

              {/* 
                CORRECT BADGE
                Visual indicator shown only when this choice is correct
                Green badge with checkmark icon
              */}
              {isCorrect && (
                <div className="mt-2">
                  <span className="badge bg-success">
                    <FaRegCheckCircle className="bi bi-check-circle me-1"></FaRegCheckCircle>
                    Correct Answer
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 
        ADD CHOICE BUTTON
        Adds a new empty choice to the end of the list
      */}
      <button
        type="button"
        className="btn btn-sm btn-outline-primary"
        onClick={addChoice}
      >
        <FaPlus className="bi bi-plus-lg me-1"></FaPlus>
        Add Another Answer
      </button>

      {/* 
        HELP TEXT
        Explains that multiple correct answers are supported
      */}
      <div className="alert alert-info mt-3 small">
        <FaInfoCircle className="bi bi-info-circle me-2"></FaInfoCircle>
        Check the box next to each correct answer. You can select multiple
        correct answers.
      </div>
    </div>
  );
}
