/**
 * Assignment Routes - Created by Alara
 */
import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const assignments = await dao.findAssignmentsForCourse(req.params.courseId);
      res.json(assignments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const assignment = await dao.findAssignmentById(req.params.assignmentId);
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    try {
      const assignment = await dao.createAssignment({ ...req.body, course: req.params.courseId });
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    try {
      const assignment = await dao.updateAssignment(req.params.assignmentId, req.body);
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    try {
      await dao.deleteAssignment(req.params.assignmentId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
