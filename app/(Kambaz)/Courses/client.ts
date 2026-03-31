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
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
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
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};

// Find users enrolled in a course
export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

// ========== Quiz API Functions ==========

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${HTTP_SERVER}/api/quizzes/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes`,
    quiz
  );
  return response.data;
};

export const updateQuiz = async (quizId: string, quiz: any) => {
  const response = await axiosWithCredentials.put(
    `${HTTP_SERVER}/api/quizzes/${quizId}`,
    quiz
  );
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(
    `${HTTP_SERVER}/api/quizzes/${quizId}`
  );
  return response.data;
};

// Quiz Attempts
export const submitQuizAttempt = async (quizId: string, attempt: any) => {
  const response = await axiosWithCredentials.post(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts`,
    attempt
  );
  return response.data;
};

export const getLastAttempt = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts/last`
  );
  return response.data;
};

export const getAllAttempts = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts`
  );
  return response.data;
};

export const getAttemptCount = async (quizId: string) => {
  const response = await axiosWithCredentials.get(
    `${HTTP_SERVER}/api/quizzes/${quizId}/attempts/count`
  );
  return response.data;
};

export function profile() {
  throw new Error("Function not implemented.");
}
