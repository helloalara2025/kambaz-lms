/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                     KAMBAZ NODE SERVER - MAIN ENTRY                       ║
 * ║                            Created by Alara                               ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * This is the heart of my backend server - think of it as the "command center"
 * that orchestrates everything. It's where all the pieces come together!
 * 
 * ARCHITECTURE OVERVIEW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Client (React/Next.js on Vercel)                                       │
 * │         ↓ HTTP Requests                                                 │
 * │  ┌───────────────────────────────────────────────────────────────────┐  │
 * │  │  Express Server (this file)                                       │  │
 * │  │    ├── CORS (cross-origin requests)                               │  │
 * │  │    ├── Session Management (user authentication)                   │  │
 * │  │    └── Routes → DAOs → MongoDB                                    │  │
 * │  └───────────────────────────────────────────────────────────────────┘  │
 * │         ↓                                                               │
 * │  MongoDB Atlas (cloud database)                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 * 
 * @author Alara
 * @course CS5610 Web Development - Northeastern University
 * @assignment A6 - MongoDB Integration
 */

// ═══════════════════════════════════════════════════════════════════════════
// IMPORTS - Loading all the libraries and modules I need
// ═══════════════════════════════════════════════════════════════════════════

import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import Lab5Routes from "./Lab5/index.js";

// ═══════════════════════════════════════════════════════════════════════════
// DATABASE CONNECTION - Connecting to MongoDB Atlas
// ═══════════════════════════════════════════════════════════════════════════

const connectionString = process.env.DATABASE_CONNECTION_STRING;

if (connectionString) {
  mongoose.connect(connectionString)
    .then(() => console.log("✅ Connected to MongoDB Atlas!"))
    .catch((err) => console.error("❌ MongoDB connection error:", err.message));
} else {
  console.warn("⚠️  No DATABASE_CONNECTION_STRING - running without database");
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPRESS APP & MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════

const app = express();

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL || "http://localhost:3000",
}));

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};

if (process.env.SERVER_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_URL,
  };
}

app.use(session(sessionOptions));
app.use(express.json());

// ═══════════════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════════════

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Kambaz Server!",
    author: "Alara",
    version: "A6 - MongoDB Integration",
    status: "running"
  });
});

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
Lab5Routes(app);

// ═══════════════════════════════════════════════════════════════════════════
// SERVER STARTUP
// ═══════════════════════════════════════════════════════════════════════════

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Kambaz Server running on port ${PORT}`);
  console.log(`   Created by Alara | CS5610`);
});
