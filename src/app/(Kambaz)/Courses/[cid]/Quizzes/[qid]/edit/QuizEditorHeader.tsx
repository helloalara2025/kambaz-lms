"use client";

/**
 * QUESTION EDITOR MODAL
 * Modal for creating/editing questions with type-specific editors (MC, T/F, Fill-in-Blank).
 * Handles validation, type switching, and coordinates data flow between parent and child editors.
 */

interface QuizEditorHeaderProps {
  quizTitle: string;
  onCancel: () => void;
  onSave: () => void;
  onSaveAndPublish: () => void;
}

export default function QuizEditorHeader({
  quizTitle,
  onCancel,
  onSave,
  onSaveAndPublish
}: QuizEditorHeaderProps) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h2 className="mb-1">Edit Quiz</h2>
        <div className="text-muted small">
          Editing: <strong>{quizTitle || "Untitled Quiz"}</strong>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary" onClick={onSave}>
          Save
        </button>
        <button className="btn btn-success" onClick={onSaveAndPublish}>
          Save & Publish
        </button>
      </div>
    </div>
  );
}