/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     COURSE ROUTES - API Endpoints                         ║
 * ║                          Created by Alara                                 ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */
import * as dao from "./dao.js";
import * as enrollmentDao from "../Enrollments/dao.js";

export default function CourseRoutes(app) {

  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/courses/:courseId", async (req, res) => {
    try {
      const course = await dao.findCourseById(req.params.courseId);
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      // Auto-enroll the creator
      if (req.session.currentUser) {
        await enrollmentDao.enrollUserInCourse(req.session.currentUser._id, course._id);
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/courses/:courseId", async (req, res) => {
    try {
      const course = await dao.updateCourse(req.params.courseId, req.body);
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/courses/:courseId", async (req, res) => {
    try {
      await dao.deleteCourse(req.params.courseId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get all users enrolled in a course
  app.get("/api/courses/:courseId/users", async (req, res) => {
    try {
      const users = await enrollmentDao.findUsersForCourse(req.params.courseId);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
