/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                      USER ROUTES - API Endpoints                          ║
 * ║                          Created by Alara                                 ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * All my user-related API endpoints live here:
 * - POST /api/users/signin     → Log in
 * - POST /api/users/signup     → Register
 * - POST /api/users/signout    → Log out
 * - POST /api/users/profile    → Get current user
 * - GET  /api/users            → List all users
 * - GET  /api/users/:id        → Get one user
 * - PUT  /api/users/:id        → Update user
 * - DELETE /api/users/:id      → Delete user
 */

import * as dao from "./dao.js";
import * as enrollmentDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {

  // ═══════════════════════════════════════════════════════════════════════
  // AUTHENTICATION ROUTES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * POST /api/users/signin
   * I check credentials and create a session if they match
   */
  app.post("/api/users/signin", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await dao.findUserByCredentials(username, password);
      if (user) {
        req.session.currentUser = user;
        res.json(user);
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  /**
   * POST /api/users/signup
   * I create a new user and log them in automatically
   */
  app.post("/api/users/signup", async (req, res) => {
    try {
      const existingUser = await dao.findUserByUsername(req.body.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
      const newUser = await dao.createUser(req.body);
      req.session.currentUser = newUser;
      res.json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  /**
   * POST /api/users/signout
   * I destroy the session to log the user out
   */
  app.post("/api/users/signout", (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  });

  /**
   * POST /api/users/profile
   * I return the currently logged-in user from the session
   */
  app.post("/api/users/profile", (req, res) => {
    if (req.session.currentUser) {
      res.json(req.session.currentUser);
    } else {
      res.status(401).json({ message: "Not logged in" });
    }
  });

  // ═══════════════════════════════════════════════════════════════════════
  // USER CRUD ROUTES
  // ═══════════════════════════════════════════════════════════════════════

  app.get("/api/users", async (req, res) => {
    try {
      const { role } = req.query;
      const users = role ? await dao.findUsersByRole(role) : await dao.findAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/users/:userId", async (req, res) => {
    try {
      const user = await dao.findUserById(req.params.userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/users/:userId", async (req, res) => {
    try {
      const user = await dao.updateUser(req.params.userId, req.body);
      req.session.currentUser = user;
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/users/:userId", async (req, res) => {
    try {
      await dao.deleteUser(req.params.userId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // ═══════════════════════════════════════════════════════════════════════
  // USER ENROLLMENT ROUTES
  // ═══════════════════════════════════════════════════════════════════════

  /**
   * GET /api/users/:userId/courses
   * I find all courses a user is enrolled in
   */
  app.get("/api/users/:userId/courses", async (req, res) => {
    try {
      const courses = await enrollmentDao.findCoursesForUser(req.params.userId);
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  /**
   * POST /api/users/current/courses/:courseId
   * I enroll the current logged-in user in a course
   */
  app.post("/api/users/current/courses/:courseId", async (req, res) => {
    try {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        return res.status(401).json({ message: "Not logged in" });
      }
      const enrollment = await enrollmentDao.enrollUserInCourse(currentUser._id, req.params.courseId);
      res.json(enrollment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  /**
   * DELETE /api/users/current/courses/:courseId
   * I unenroll the current logged-in user from a course
   */
  app.delete("/api/users/current/courses/:courseId", async (req, res) => {
    try {
      const currentUser = req.session.currentUser;
      if (!currentUser) {
        return res.status(401).json({ message: "Not logged in" });
      }
      await enrollmentDao.unenrollUserFromCourse(currentUser._id, req.params.courseId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
