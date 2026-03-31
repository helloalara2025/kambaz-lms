"use client";
/**
 * ============================================================================
 * QUESTION EDITOR MODAL - Main question creation/editing interface
 * ============================================================================
 * 
 * @description
 * Modal dialog for creating new questions or editing existing ones.
 * Coordinates three question types and their type-specific editors.
 * Handles validation and data flow between parent (Quiz Editor) and children.
 * 
 * @features
 * - Universal fields: title, question text, points, type
 * - Type-specific editors: Multiple Choice, True/False, Fill in Blank
 * - Smart type switching: Resets type-specific data when type changes
 * - Comprehensive validation before save
 * - Modal overlay with scrollable content
 * 
 * @workflow
 * NEW QUESTION:
 * 1. Parent opens modal with question=null
 * 2. Form initializes with defaults
 * 3. Faculty fills form and saves
 * 4. Validation runs
 * 5. onSave(questionData) called → parent handles API call
 * 
 * EDIT QUESTION:
 * 1. Parent opens modal with question=existingQuestion
 * 2. Form loads with existing data
 * 3. Faculty modifies and saves
 * 4. Validation runs
 * 5. onSave(updatedData) called → parent handles API call
 * 
 * ============================================================================
 */

import { useState, useEffect } from "react";
import MultipleChoiceEditor from "./MultiChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillBlankEditor from "./FillInBlankEditor";

/**
 * Props interface for QuestionEditor
 * 
 * @param question - Existing question data (null for new questions)
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback to close modal without saving
 * @param onSave - Callback to save question data (parent handles API)
 */
interface QuestionEditorProps {
  question: any | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: any) => void;
}

export default function QuestionEditor({
  question,
  isOpen,
  onClose,
  onSave
}: QuestionEditorProps) {

  // ============================================================================
  // LOCAL STATE - Form data
  // ============================================================================
  
  /**
   * Form data state
   * Contains all question fields for all question types
   * 
   * @fields
   * - title: Question identifier (e.g., "Question 1")
   * - type: Question type enum (MULTIPLE_CHOICE, TRUE_FALSE, FILL_IN_BLANK)
   * - points: Point value for this question
   * - question: The actual question text students see
   * - choices: Array of answer options (for MC and T/F)
   * - correctAnswers: Array of correct answer strings
   */
  const [formData, setFormData] = useState<any>({
    title: "",
    type: "MULTIPLE_CHOICE",
    points: 1,
    question: "",
    choices: ["", ""],
    correctAnswers: []
  });

  // ============================================================================
  // EFFECTS - Load question data when editing
  // ============================================================================
  
  /**
   * LOAD QUESTION DATA
   * Runs when:
   * - Modal opens (isOpen changes to true)
   * - Question prop changes (switching between edit/new)
   * 
   * @behavior
   * - If question exists: Load its data into form
   * - If question is null: Reset to default new question state
   * 
   * This ensures the form is always in the correct state:
   * - Editing: Shows existing question data
   * - New: Shows blank form with defaults
   */
  useEffect(() => {
    // EDIT MODE: Load existing question data
    if (question) {
      setFormData(question);
    } else {
      // NEW MODE: Reset to defaults for new question
      setFormData({
        title: "",
        type: "MULTIPLE_CHOICE",
        points: 1,
        question: "",
        choices: ["", ""],
        correctAnswers: []
      });
    }
  }, [question, isOpen]); // Re-run when question or modal state changes

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * HANDLE TYPE CHANGE
   * Called when faculty switches question type dropdown
   * 
   * @param newType - The new question type enum
   * * @behavior
   * Resets type-specific fields while preserving common fields
   * Each question type has different requirements:
   * 
   * MULTIPLE_CHOICE:
   * - Needs choices array (min 2)
   * - Needs correctAnswers array (checked items)
   * 
   * TRUE_FALSE:
   * - Fixed choices: ["True", "False"]
   * - correctAnswers: ["True"] default (one of the two)
   * 
   * FILL_IN_BLANK:
   * - No choices array (students type answer)
   * - correctAnswers: [""] (possible text answers)
   * 
   * @workflow
   * 1. Preserve common fields (title, points, question text)
   * 2. Set type to new type
   * 3. Initialize type-specific fields based on new type
   * 4. Update form state
   */
  const handleTypeChange = (newType: string) => {
    // Preserve common fields across question types
    const baseData = {
      title: formData.title,
      type: newType,
      points: formData.points,
      question: formData.question
    };

    // Initialize type-specific fields based on new type
    switch(newType) {
      case 'MULTIPLE_CHOICE':
        // Start with 2 empty choices and no correct answers
        setFormData({
          ...baseData,
          choices: ["", ""],
          correctAnswers: []
        });
        break;

        // TRUE/FALSE has fixed choices and one correct answer
      case 'TRUE_FALSE':
        setFormData({
          ...baseData,
          choices: ["True", "False"],
          correctAnswers: ["True"]
        });
        break;
      case 'FILL_IN_BLANK':
        // No choices (student types) one empty correct answer
        setFormData({
          ...baseData,
          choices: [],
          correctAnswers: [""]
        });
        break;
    }
  };

  /**
   * HANDLE SAVE
   * Validates form data and calls parent's onSave if valid
   * 
   * @validation
   * UNIVERSAL (all question types):
   * - Title must not be empty
   * - Question text must not be empty
   * - Points must be greater than 0
   * 
   * TYPE-SPECIFIC:
   * MULTIPLE_CHOICE:
   * - At least 2 choices required
   * - All choices must have text (no empty strings)
   * - At least 1 correct answer must be selected
   * 
   * TRUE_FALSE:
   * - No additional validation (always valid if universal passes)
   * 
   * FILL_IN_BLANK:
   * - At least 1 possible answer required
   * - All answers must have text (no empty strings)
   * * @workflow
   * 1. Run universal validation
   * 2. Run type-specific validation
   * 3. If all pass: Call onSave(formData)
   * 4. If any fail: Show alert and stop
   * 5. Parent (Quiz Editor page) handles the API call
   */
  const handleSave = () => {
    // Universal validation checks

    // validate title
    if (!formData.title.trim()) {
      alert("Please enter a question title");
      return;
    }
    // validate question text
    if (!formData.question.trim()) {
      alert("Please enter the question text");
      return;
    }
    // validate points
    if (formData.points <= 0) {
      alert("Points must be greater than 0");
      return;
    }

    // Type-specific validation
    if (formData.type === 'MULTIPLE_CHOICE') {
      // Check all choices have text
      const allFilled = formData.choices?.every((c: string) => c.trim());

       // Check minimum choice count
      if (!allFilled || formData.choices.length < 2) {
        alert("Please provide at least 2 answer choices");
        return;
      }

       // Check at least one correct answer selected
      if (!formData.correctAnswers || formData.correctAnswers.length === 0) {
        alert("Please select at least one correct answer");
        return;
      }
    }

    if (formData.type === 'FILL_IN_BLANK') {
      // Check all answers have text
      const allFilled = formData.correctAnswers?.every((a: string) => a.trim());

          // Check at least one answer provided
      if (!allFilled || formData.correctAnswers?.length === 0) {
        alert("Please provide at least one possible answer");
        return;
      }
    }
    // ========= All validations passed ========

    // If all validations pass, call onSave with form data
    onSave(formData);
  };

  // ============================================================================
  // RENDER GUARD - Don't render if modal is closed
  // ============================================================================
  
  /**
   * Early return if modal not open
   * Prevents unnecessary rendering and improves performance
   */
  if (!isOpen) return null;

  return (
    /* 
      MODAL OVERLAY
      - Dark semi-transparent background
      - Centers modal on screen
      - Clicking outside doesn't close (must use buttons)
    */
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      {/* 
        MODAL DIALOG
        - Large size for comfortable editing
        - Scrollable if content exceeds viewport height
      */}
      <div className="modal-dialog modal-lg modal-dialog-scrollable">
        <div className="modal-content">

          {/* 
            MODAL HEADER
            - Shows "New Question" or "Edit Question"
            - Close button (X) in top right
          */}
          <div className="modal-header">
            <h5 className="modal-title">
              {question ? 'Edit Question' : 'New Question'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* 
            MODAL BODY
            Contains all form fields and type-specific editors
          */}
          <div className="modal-body">
            
            {/* ========== UNIVERSAL FIELDS ========== */}
            
            {/* Question Title */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Question Title</label>
              <input
                type="text"
                className="form-control"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Question 1"
              />
            </div>

            {/* Question Type & Points */}
            <div className="row mb-3">
              {/* Question Type Dropdown */ }
              <div className="col-md-8">
                <label className="form-label fw-semibold">Question Type</label>
                <select
                  className="form-select"
                  value={formData.type}
                  onChange={(e) => handleTypeChange(e.target.value)}
                >
                  <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                  <option value="TRUE_FALSE">True/False</option>
                  <option value="FILL_IN_BLANK">Fill in the Blank</option>
                </select>
              </div>

                 {/* Points Input */}
              <div className="col-md-4">
                <label className="form-label fw-semibold">Points</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) || 0 })}
                  min="1"
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Question</label>
              <textarea
                className="form-control"
                rows={3}
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Enter your question here..."
              />
              <div className="form-text small">
                This is the main question text students will see.
              </div>
            </div>

            <hr />             {/* Horizontal divider */}

            {/* ========== TYPE-SPECIFIC EDITORS ========== */}
            
            {/* 
              CONDITIONAL RENDERING
              Shows the appropriate editor based on current question type
              Each editor manages its own specific fields
            */}
            
            {/* MULTIPLE CHOICE EDITOR */}
            {formData.type === 'MULTIPLE_CHOICE' && (
              <MultipleChoiceEditor
                choices={formData.choices || []}
                correctAnswers={formData.correctAnswers || []}
                onChange={(choices, correctAnswers) => 
                  setFormData({ ...formData, choices, correctAnswers })
                }
              />
            )}
            {/* TRUE/FALSE EDITOR */}
            {formData.type === 'TRUE_FALSE' && (
              <TrueFalseEditor
                correctAnswer={formData.correctAnswers?.[0] || "True"}
                onChange={(answer) => 
                  setFormData({ 
                    ...formData, 
                    choices: ["True", "False"],
                    correctAnswers: [answer] 
                  })
                }
              />
            )}

            {/* FILL IN THE BLANK EDITOR */}
            {formData.type === 'FILL_IN_BLANK' && (
              <FillBlankEditor
                correctAnswers={formData.correctAnswers || []}
                onChange={(correctAnswers) => 
                  setFormData({ ...formData, choices: [], correctAnswers })
                }
              />
            )}
          </div>
          {/* 
            MODAL FOOTER 
            ACTION BUTTON:
            - Cancel button to close without saving
            - Save button to validate and save question
          */}
          <div className="modal-footer">
            {/* Cancel button - closes without saving */}
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>

            
            {/* 
              Save button
              - Text changes based on mode (Update vs Save)
              - Triggers validation and save
            */}
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              {question ? 'Update Question' : 'Save Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}