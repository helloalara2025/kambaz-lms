// The + Quiz button with 3-dot menu and search bar for quizzes page
"use client";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus, FaGlasses, FaChalkboardTeacher } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
/**
 * QuizzesControls component props.
 * Interface (not constants) because these are dynamic runtime values
 * passed from parent component, not fixed compile-time constants.
 */
interface QuizControlProps {
  searchTerm: string; // Dynamic: changes as user types (not a constant)
  setSearchTerm: (term: string) => void; // Function: updates parent state (not a constant)
  addQuiz: () => void; // Callback: triggers quiz creation (not a constant)
  isFaculty: boolean; // Computed: based on user role (not a constant)
  isPreviewing: boolean;
  setIsPreviewing: (isViewing: boolean) => void;
}

export default function QuizzesControls({
  searchTerm,
  setSearchTerm,
  addQuiz,
  isFaculty,
  isPreviewing,
  setIsPreviewing,
}: QuizControlProps) {
  const [tempSearch, setTempSearch] = useState(searchTerm);

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      
      {/* Search bar */}
      <div className="input-group" style={{ maxWidth: "500px" }}>
        <span className="input-group-text">
          <i className="bi bi-search"></i>
        </span>

        <input
          type="text"
          className="form-control"
          placeholder="Search quizzes…"
          value={tempSearch}
          onChange={(e) => setTempSearch(e.target.value)}
        />

        {/* Search button */}
        <Stack direction="horizontal" gap={4}>
          <Button
            variant="primary"
            onClick={() => setSearchTerm(tempSearch)}
            className="ms-3"
          >
            Search
          </Button>
          {/* Clear search */}
          <Button
            variant="danger"
            onClick={() => {
              setSearchTerm("");
              setTempSearch("");
            }}
          >
            Clear
          </Button>
        </Stack>
      </div>

      {/* Add Quiz Button + 3-dot menu (Faculty Only) */}
      <Stack direction="horizontal" gap={4}>
        {isFaculty && (
          <div className="d-flex gap-2">
            {/* Switch to Student Quiz List View / Faculty Viewing */}
            <Button
              variant={isPreviewing ? "warning" : "secondary"}
              onClick={() => setIsPreviewing(!isPreviewing)}
              title={isPreviewing ? "Exit Student View" : "View as Student"}
            >
              {isPreviewing ? (
                <>
                  <FaChalkboardTeacher
                    className="position-relative me-2"
                    style={{ bottom: "1px" }}
                  />
                  Exit Preview
                </>
              ) : (
                <>
                  <FaGlasses
                    className="position-relative me-2"
                    style={{ bottom: "1px" }}
                  />
                  Student View
                </>
              )}
            </Button>

            {/* Add Quiz Button */}
            <Button variant="danger" onClick={addQuiz}>
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Quiz
            </Button>

            {/* 3-dot menu for quiz controls like to publish, unpublish, search quiz */}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="quiz-controls-dropdown">
                <IoEllipsisVertical className="fs-5" />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                <Dropdown.Item>
                  <i className="bi bi-search me-2 text-primary"></i>
                  Search for Quiz
                </Dropdown.Item>

                 {/* Sorting options inside */}
                <Dropdown.Item>
                  <i className="bi bi-arrow-down-up me-2 text-info"></i>
                  Sort by Name
                </Dropdown.Item>

                <Dropdown.Item>
                  <i className="bi bi-calendar me-2 text-success"></i>
                  Sort by Date
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item>
                  <FcCheckmark className="bi bi-check-circle me-2 text-success"></FcCheckmark>
                  Publish All
                </Dropdown.Item>

                <Dropdown.Item>
                  <FaRegCircleXmark className="bi bi-x-circle me-2 text-warning"></FaRegCircleXmark>
                  Unpublish All
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
      </Stack>
    </div>
  );
}
