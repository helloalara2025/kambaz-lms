"use client";
/**
 * QUIZ EDITOR TABS
 * Tab navigation for switching between Details and Questions tabs.
 * Highlights active tab and triggers onTabChange callback when clicked.
 */
interface QuizEditorTabsProps {
  activeTab: "details" | "questions";
  onTabChange: (tab: "details" | "questions") => void;
}

export default function QuizEditorTabs({
  activeTab,
  onTabChange
}: QuizEditorTabsProps) {
  return (
    <ul className="nav nav-tabs mb-3">
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "details" ? "active" : ""}`}
          onClick={() => onTabChange("details")}
        >
          Details
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
          onClick={() => onTabChange("questions")}
        >
          Questions
        </button>
      </li>
    </ul>
  );
}