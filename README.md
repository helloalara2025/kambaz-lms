# Kambaz LMS

A full-stack learning management system built with React, Next.js, Node.js, Express, and MongoDB. Supports course management, module organization, quiz creation with auto-grading, enrollment workflows, and role-based access for students and faculty.

!(lms.svg)

## Features

- **Course management** — create, update, delete courses (faculty/admin); browse and enroll (students)
- **Modules** — organize course content into collapsible modules with CRUD operations
- **Assignments** — create and manage assignments within courses
- **Quizzes** — full quiz engine with question management, timed attempts, auto-save, and submission grading
- **Enrollment system** — enroll/unenroll with toggle between "my courses" and "all courses" views
- **Authentication** — session-based auth with role-based access control (student, faculty, admin)
- **Dashboard** — personalized course grid filtered by enrollment status

## Architecture

```
kambaz-lms/
├── client/                          ← Next.js frontend (Vercel)
│   ├── src/app/
│   │   ├── (Kambaz)/               ← App route group
│   │   │   ├── Dashboard/          → Course grid with enroll/unenroll
│   │   │   ├── Courses/            → Course pages, modules, assignments, quizzes
│   │   │   ├── Account/            → Auth (signin/signup/profile), session management
│   │   │   ├── Enrollments/        → Enrollment API client + Redux slice
│   │   │   ├── Database/           → Seed data (JSON) for courses, users, modules
│   │   │   ├── store.ts            → Redux store (courses, modules, assignments, quizzes, enrollments, account)
│   │   │   └── layout.tsx          → Provider wrapper (Redux + Session)
│   │   └── Labs/                   → Lab exercises (Lab 1–5)
│   └── public/images/              → Course card images
│
└── server/                          ← Express backend (Render)
    ├── index.js                     → Entry point — Express, CORS, session, Mongoose connection
    └── Kambaz/
        ├── Users/                   → User routes, DAO, Mongoose schema
        ├── Courses/                 → Course routes, DAO, schema
        ├── Modules/                 → Module routes, DAO, schema
        ├── Assignments/             → Assignment routes, DAO, schema
        └── Enrollments/             → Enrollment routes, DAO, schema
```

**Data flow:** React components dispatch Redux actions → Axios API clients (with credentials) → Express REST routes → Mongoose DAOs → MongoDB Atlas

## Tech Stack

**Frontend:** React 18, Next.js (App Router), TypeScript, Redux Toolkit, Axios, Bootstrap, React Icons
**Backend:** Node.js, Express, Mongoose, express-session
**Database:** MongoDB Atlas
**Deployment:** Vercel (frontend), Render (backend)
**Auth:** Session-based with secure cookies (SameSite, HTTPS in production)

## Run It Locally

**Backend:**
```bash
cd server
cp .env.example .env        # fill in your MongoDB connection string
npm install
npm run dev                  # runs on localhost:4000
```

**Frontend:**
```bash
cd client
npm install
echo "NEXT_PUBLIC_HTTP_SERVER=http://localhost:4000" > .env.local
npm run dev                  # runs on localhost:3000
```

## API Endpoints

| Resource | Methods | Auth |
| :--- | :--- | :--- |
| `/api/users` | GET, POST, PUT, DELETE, signin/signout | Session |
| `/api/courses` | GET, POST, PUT, DELETE | Session (faculty for writes) |
| `/api/courses/:cid/modules` | GET, POST, PUT, DELETE | Session |
| `/api/courses/:cid/quizzes` | GET, POST, PUT, DELETE, publish | Session |
| `/api/courses/:cid/quizzes/:qid/questions` | POST, PUT, DELETE | Session |
| `/api/courses/:cid/quizzes/:qid/attempts` | GET, POST, PUT, submit | Session |
| `/api/users/:uid/enrollments` | GET | Session |
| `/api/users/current/courses/:cid` | POST (enroll), DELETE (unenroll) | Session |

## Highlights

- **Full-stack ownership** — designed and built both the API layer and the React frontend from scratch
- **State management** — Redux Toolkit slices keep client state in sync with the database across courses, modules, quizzes, enrollments, and auth
- **Role-based access** — faculty can create/edit/delete courses and quizzes; students can browse, enroll, and take quizzes
- **Quiz engine** — supports multiple question types, attempt tracking, auto-save during attempts, and submission with grading
- **Session auth** — secure cookie-based sessions with CORS credentials, configured for both local dev and cross-origin production deployment
