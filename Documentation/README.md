# Kambaz – Learning Management System (LMS)

built with a React/Next.js frontend and a Node/Express/MongoDB backend. 
It supports courses, modules, assignments, quizzes, grading views, and role‑based access for faculty and students.

---

## Core Features

- **Authentication & Profiles**
  - Sign up / login with role selection (STUDENT or FACULTY).
  - Profile page to view and update user details.

- **Courses**
  - Faculty can create and manage courses.
  - Students can view and participate in enrolled courses.
  - Course home shows navigation to Modules, Assignments, Quizzes, Grades, etc.

- **Modules & Content**
  - Instructors structure course content as modules, with items like pages, links, assignments, and quizzes.

- **Assignments**
  - Faculty create assignments with points and due dates.
  - Students submit work; grades appear in the gradebook.

- **Quizzes**
  - Faculty:
    - Create, edit, delete, preview, publish/unpublish quizzes per course.
    - Configure time limits, multiple attempts and attempt limits, access codes, and feedback rules.
  - Students:
    - See only published quizzes.
    - See last score and attempt count for each quiz.
    - Take quizzes with support for timers and multiple attempts (if allowed).

- **Grades**
  - Students see a grade view per course.
  - Faculty see student performance across assignments and quizzes.

---

## Tech Stack

- **Frontend**
  - Next.js (React)
  - Redux for global state (account, courses, quizzes, etc.)
  - Bootstrap / custom CSS

- **Backend**
  - Node.js, Express.js
  - MongoDB with Mongoose models (User, Course, Module, Assignment, Quiz, QuizAttempt, etc.)
  - Session‑based auth 