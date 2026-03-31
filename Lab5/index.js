/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         LAB 5 - Express Exercises                         ║
 * ║                            Created by Alara                               ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * These are my Lab 5 exercises from the course - practicing Express.js basics!
 */

let assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2024-10-10",
  completed: false,
  score: 0,
};

const module = {
  id: "M101",
  name: "Introduction to Rocket Propulsion",
  description: "Basic principles of rocket propulsion",
  course: "RS101",
};

export default function Lab5Routes(app) {

  // ═══════════════════════════════════════════════════════════════════════
  // BASIC ROUTES
  // ═══════════════════════════════════════════════════════════════════════

  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5 - Created by Alara");
  });

  // ═══════════════════════════════════════════════════════════════════════
  // CALCULATOR ROUTES
  // ═══════════════════════════════════════════════════════════════════════

  app.get("/lab5/add/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ result: parseInt(a) + parseInt(b) });
  });

  app.get("/lab5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ result: parseInt(a) - parseInt(b) });
  });

  app.get("/lab5/multiply/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ result: parseInt(a) * parseInt(b) });
  });

  app.get("/lab5/divide/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ result: parseInt(a) / parseInt(b) });
  });

  // Query Parameters Calculator
  app.get("/lab5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    switch (operation) {
      case "add":
        result = parseInt(a) + parseInt(b);
        break;
      case "subtract":
        result = parseInt(a) - parseInt(b);
        break;
      case "multiply":
        result = parseInt(a) * parseInt(b);
        break;
      case "divide":
        result = parseInt(a) / parseInt(b);
        break;
      default:
        result = "Invalid operation";
    }
    res.send(result.toString());
  });

  // ═══════════════════════════════════════════════════════════════════════
  // ASSIGNMENT ROUTES
  // ═══════════════════════════════════════════════════════════════════════

  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  app.get("/lab5/assignment/title", (req, res) => {
    res.json({ title: assignment.title });
  });

  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    assignment.title = req.params.newTitle;
    res.json(assignment);
  });

  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    assignment.score = parseInt(req.params.newScore);
    res.json(assignment);
  });

  app.get("/lab5/assignment/completed/:isCompleted", (req, res) => {
    assignment.completed = req.params.isCompleted === "true";
    res.json(assignment);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // MODULE ROUTES
  // ═══════════════════════════════════════════════════════════════════════

  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });

  app.get("/lab5/module/name", (req, res) => {
    res.json({ name: module.name });
  });

  app.get("/lab5/module/name/:newName", (req, res) => {
    module.name = req.params.newName;
    res.json(module);
  });

  app.get("/lab5/module/description/:newDescription", (req, res) => {
    module.description = req.params.newDescription;
    res.json(module);
  });

  // ═══════════════════════════════════════════════════════════════════════
  // TODOS ARRAY ROUTES (Working with Arrays)
  // ═══════════════════════════════════════════════════════════════════════

  let todos = [
    { id: 1, title: "Task 1", description: "Description 1", completed: false },
    { id: 2, title: "Task 2", description: "Description 2", completed: true },
    { id: 3, title: "Task 3", description: "Description 3", completed: false },
    { id: 4, title: "Task 4", description: "Description 4", completed: true },
  ];

  // Get all todos (with optional filter by completed)
  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const filtered = todos.filter((t) => t.completed === completedBool);
      res.json(filtered);
      return;
    }
    res.json(todos);
  });

  // Create todo via GET (legacy)
  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
    };
    todos.push(newTodo);
    res.json(todos);
  });

  // Create todo via POST
  app.post("/lab5/todos", (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    todos.push(newTodo);
    res.json(newTodo);
  });

  // Get todo by ID
  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    res.json(todo);
  });

  // Delete todo via GET (legacy)
  app.get("/lab5/todos/:id/delete", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.json(todos);
  });

  // Delete todo via DELETE
  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todoIndex, 1);
    res.sendStatus(200);
  });

  // Update todo via PUT
  app.put("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todos = todos.map((t) => {
      if (t.id === parseInt(id)) {
        return { ...t, ...req.body };
      }
      return t;
    });
    res.sendStatus(200);
  });

  // Update todo title via GET
  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.title = title;
    res.json(todos);
  });

  // Update todo completed via GET
  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.completed = completed === "true";
    res.json(todos);
  });

  // Update todo description via GET
  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (todo) todo.description = description;
    res.json(todos);
  });
}
