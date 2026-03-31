// Assignment editor page
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { Form, FormControl, FormSelect, FormLabel, Row, Col, Button } from "react-bootstrap";
import * as client from "../client"
export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const assignments = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );

  const isNew = aid === "new";
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>({
    _id: "",
    title: "",
    description: "",
    points: 100,
    group: "ASSIGNMENTS",
    gradeDisplay: "Percentage",
    submissionType: "Online",
    onlineOptions: ["Text Entry", "Website URL", "Media Recordings", "Student Annotation", "File Uploads"], // ✅ Fixed bracket
    assignTo: "Everyone",
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid as string,
  });

  useEffect(() => {
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [existingAssignment]);

  const handleSave = async () => {
    try {
      if (isNew) {
        const newAssignment = await client.createAssignmentForCourse(cid as string, assignment);
        // Create a new assignment on server
        dispatch(addAssignment(newAssignment));
      } else {
        // Update existing assignment on erver
        const status = await client.updateAssignment(assignment);
        dispatch(updateAssignment(assignment));
      }
      router.push(`/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Failed to save assignment:", error);
    }
  };

  const handleCancel = () => {

    router.push(`/Courses/${cid}/Assignments`);
  };

  const toggleOnlineOption = (option: string) => {
    const currentOptions = assignment.onlineOptions || [];
    if (currentOptions.includes(option)) {
      setAssignment({
        ...assignment,
        onlineOptions: currentOptions.filter((o: string) => o !== option),
      });
    } else {
      setAssignment({
        ...assignment,
        onlineOptions: [...currentOptions, option],
      });
    }
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <h3>{isNew ? "New Assignment" : "Edit Assignment"}</h3>
      <Form>
        {/* Assignment Name */}
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <FormControl
          id="wd-name"
          value={assignment.title}
          onChange={(e: any) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
          placeholder="Enter assignment name..."
          className="mb-3"
        />

        {/* Description */}
        <FormLabel htmlFor="wd-description">Description</FormLabel>
        <FormControl
          as="textarea"
          id="wd-description"
          rows={5}
          value={assignment.description}
          onChange={(e: any) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
          placeholder="Write something here descriptive of the assignment..."
          className="mb-3"
        />

        {/* Points */}
        <Row className="mb-3">
          <Col md={3}>
            <FormLabel htmlFor="wd-points" className="text-end d-block">
              Points
            </FormLabel>
          </Col>
          <Col md={9}>
            <FormControl
              id="wd-points"
              type="number"
              value={assignment.points}
              onChange={(e: any) =>
                setAssignment({ ...assignment, points: Number(e.target.value) })
              }
              placeholder="100"
            />
          </Col>
        </Row>

        {/* Assignment Group */}
        <Row className="mb-3">
          <Col md={3}>
            <FormLabel htmlFor="wd-group" className="text-end d-block">
              Assignment Group
            </FormLabel>
          </Col>
          <Col md={9}>
            <FormSelect
              id="wd-group"
              value={assignment.group}
              onChange={(e: any) =>
                setAssignment({ ...assignment, group: e.target.value })
              }
            >
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="PROJECTS">Projects</option>
            </FormSelect>
          </Col>
        </Row>

        {/* Display Grade As */}
        <Row className="mb-3">
          <Col md={3}>
            <FormLabel htmlFor="wd-display-grade-as" className="text-end d-block">
              Display Grade as
            </FormLabel>
          </Col>
          <Col md={9}>
            <FormSelect
              id="wd-display-grade-as"
              value={assignment.gradeDisplay}
              onChange={(e: any) =>
                setAssignment({ ...assignment, gradeDisplay: e.target.value })
              }
            >
              <option value="Percentage">Percentage</option>
              <option value="Letter">Letter Grade</option>
            </FormSelect>
          </Col>
        </Row>

        {/* Submission Type - IN A BOX */}
        <Row className="mb-3">
          <Col md={3}>
            <FormLabel htmlFor="wd-submission-type" className="text-end d-block">
              Submission Type
            </FormLabel>
          </Col>
          <Col md={9}>
            <div className="border rounded p-3">
              <FormSelect
                id="wd-submission-type"
                value={assignment.submissionType}
                onChange={(e: any) =>
                  setAssignment({ ...assignment, submissionType: e.target.value })
                }
                className="mb-3"
              >
                <option value="Online">Online</option>
                <option value="Paper">Paper</option>
                <option value="External Tool">External Tool</option>
              </FormSelect>

              {/* Online Entry Options */}
              {assignment.submissionType === "Online" && (
                <div>
                  <strong className="d-block mb-2">Online Entry Options</strong>
                  {[
                    "Text Entry",
                    "Website URL",
                    "Media Recordings",
                    "Student Annotation",
                    "File Uploads",
                  ].map((option) => (
                    <Form.Check
                      key={option}
                      type="checkbox"
                      label={option}
                      checked={assignment.onlineOptions?.includes(option)}
                      onChange={() => toggleOnlineOption(option)}
                      className="mb-1"
                    />
                  ))}
                </div>
              )}
            </div>
          </Col>
        </Row>

        {/* Assign Section - IN A BOX */}
        <Row className="mb-3">
          <Col md={3}>
            <FormLabel className="text-end d-block">
              Assign
            </FormLabel>
          </Col>
          <Col md={9}>
            <div className="border rounded p-3">
              {/* Assign To */}
              <FormLabel htmlFor="wd-assign-to" className="fw-bold">
                Assign to
              </FormLabel>
              <FormControl
                id="wd-assign-to"
                value={assignment.assignTo || ""}
                onChange={(e: any) =>
                  setAssignment({ ...assignment, assignTo: e.target.value })
                }
                placeholder="Everyone"
                className="mb-3"
              />

              {/* Due Date */}
              <FormLabel htmlFor="wd-due-date" className="fw-bold">
                Due
              </FormLabel>
              <FormControl
                id="wd-due-date"
                type="date"
                value={assignment.dueDate}
                onChange={(e: any) =>
                  setAssignment({ ...assignment, dueDate: e.target.value })
                }
                className="mb-3"
              />

              {/* Available From and Until - Side by Side */}
              <Row>
                <Col md={6}>
                  <FormLabel htmlFor="wd-available-from" className="fw-bold">
                    Available from
                  </FormLabel>
                  <FormControl
                    id="wd-available-from"
                    type="date"
                    value={assignment.availableFrom}
                    onChange={(e: any) =>
                      setAssignment({
                        ...assignment,
                        availableFrom: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6}>
                  <FormLabel htmlFor="wd-available-until" className="fw-bold">
                    Until
                  </FormLabel>
                  <FormControl
                    id="wd-available-until"
                    type="date"
                    value={assignment.availableUntil}
                    onChange={(e: any) =>
                      setAssignment({
                        ...assignment,
                        availableUntil: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <hr />
        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}