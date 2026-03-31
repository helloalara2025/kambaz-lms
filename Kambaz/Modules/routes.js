/**
 * Module Routes - Created by Alara
 * Modules are nested under courses: /api/courses/:courseId/modules
 */
import * as dao from "./dao.js";

export default function ModuleRoutes(app) {

  app.get("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const modules = await dao.findModulesForCourse(req.params.courseId);
      res.json(modules);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    try {
      const module = await dao.createModule({ ...req.body, course: req.params.courseId });
      res.json(module);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.put("/api/courses/:courseId/modules/:moduleId", async (req, res) => {
    try {
      const module = await dao.updateModule(req.params.moduleId, req.body);
      res.json(module);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/courses/:courseId/modules/:moduleId", async (req, res) => {
    try {
      await dao.deleteModule(req.params.moduleId);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
