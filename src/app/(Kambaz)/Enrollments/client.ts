/*******************************************
 * Enrollments Client - Alara Hakki
 * 
 * This is my axios client for enrollment operations.
 * Users can enroll and unenroll from courses.
 * I use "current" to refer to logged-in user.
 *******************************************/
import axios from "axios";

/* I create axios instance with credentials for cookies */
const axiosWithCredentials = axios.create({ withCredentials: true });

/* My backend server URL */
const HTTP = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

/* Fetch all enrollments for a specific user */
export const findEnrollmentsForUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${HTTP}/api/users/${userId}/enrollments`);
  return response.data;
};

/* Enroll current user in a course */
export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(`${HTTP}/api/users/current/courses/${courseId}`);
  return response.data;
};

/* Unenroll current user from a course */
export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`${HTTP}/api/users/current/courses/${courseId}`);
  return response.data;
};