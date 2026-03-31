/**
 * ============================================================================
 * COURSES API CLIENT
 * ============================================================================
 * 
 * Central API client for all course-related operations including:
 * - Courses (CRUD, enrollment)
 * - Modules (create, read, update, delete)
 * - Quizzes (management, questions, attempts)
 * 
 * This file acts as the middleman between the frontend (React/Next.js) and 
 * the backend API (Node.js/Express), organizing all HTTP requests in one place.
 * 
 * Base URL: Configured via NEXT_PUBLIC_HTTP_SERVER environment variable
 * Authentication: Uses axios with credentials for session-based authentification
 * 
 * ============================================================================
 */

import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;

// ====== courses ======= 
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  console.log("Fetching:", (`${USERS_API}/current/courses`)); // Also fixed the console.log
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

// Delete Course (no module parameter needed)
export const deleteCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
  return data;
};

// Update course (send entire course object)
export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};

// Enroll in course
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};

// Unenroll in course
export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};


// ===== MODULES =====

// Make new module for a course
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

// Find module for course
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

// Update module
export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axios.put(
    `${COURSES_API}/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return response.data;
};

// Find users enrolled in a course
export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

// ========== Quizzes ==========
// GET ALL QUIZZES FOR A COURSE 
export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

// GET A SINGLE QUIZ
export const findQuizById = async (courseId: string, quizId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes/${quizId}`);
  return response.data;
};

// CREATE QUIZ 
export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz || {}
  );
  return response.data;
};

// UPDATE QUIZ 
export const updateQuiz = async (courseId: string, quizId: string, quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`,
    quiz
  );
  return response.data;
};

// DELETE QUIZ
export const deleteQuiz = async (courseId: string, quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/quizzes/${quizId}`
  );
  return response.data;
};

// PUBLISH QUIZ
export const publishQuiz = async (courseId: string, quizId: string) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/publish`
  );
  return response.data;
}

// ======= QUIZ QUESTIONS ====

// ADD QUESTION TO QUIZ
export const addQuestionToQuiz = async (courseId: string, quizId: string, question: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions`,
    question
  );
  return response.data;
}

// UPDATE QUESTION
export const updateQuestion = async (courseId: string, quizId: string, questionId: string, updates: any) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`,
    updates
  );
  return response.data;
}

// DELETE QUESTION
export const deleteQuestion = async (courseId: string, quizId: string, questionId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/questions/${questionId}`
  );
  return response.data;
};

// ===== QUIZ ATTEMPTS =====

// Get all attempts for a quiz
export const getAllAttempts = async (courseId: string, quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`
  );
  return response.data;
};

// Get latest attempt
export const getLatestAttempt = async (courseId: string, quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts/latest`
  );
  return response.data;
};

// Start new attempt
export const startQuizAttempt = async (courseId: string, quizId: string) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts`
  );
  return response.data;
};

// Save answers (auto-save without submitting)
export const saveQuizAnswers = async (courseId: string, quizId: string, attemptId: string, answers: any[]) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts/${attemptId}`,
    { answers }
  );
  return response.data;
};

// Submit attempt
export const submitQuizAttempt = async (courseId: string, quizId: string, attemptId: string, answers: any[]) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/attempts/${attemptId}/submit`,
    { answers }
  );
  return response.data;
};
