/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                    ENROLLMENT DAO - Data Access Object                    ║
 * ║                           Created by Alara                                ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * Enrollments connect users to courses (many-to-many relationship).
 * This DAO handles all the enrollment-related database operations.
 */
import EnrollmentModel from "./model.js";
import CourseModel from "../Courses/model.js";
import UserModel from "../Users/model.js";

/**
 * Find all courses a user is enrolled in
 */
export const findCoursesForUser = async (userId) => {
  const enrollments = await EnrollmentModel.find({ user: userId });
  const courseIds = enrollments.map((e) => e.course);
  const courses = await CourseModel.find({ _id: { $in: courseIds } });
  return courses;
};

/**
 * Find all users enrolled in a course
 */
export const findUsersForCourse = async (courseId) => {
  const enrollments = await EnrollmentModel.find({ course: courseId });
  const userIds = enrollments.map((e) => e.user);
  const users = await UserModel.find({ _id: { $in: userIds } });
  return users;
};

/**
 * Enroll a user in a course
 */
export const enrollUserInCourse = async (userId, courseId) => {
  const _id = new Date().getTime().toString();
  return EnrollmentModel.create({ _id, user: userId, course: courseId });
};

/**
 * Unenroll a user from a course
 */
export const unenrollUserFromCourse = async (userId, courseId) => {
  return EnrollmentModel.deleteOne({ user: userId, course: courseId });
};

/**
 * Check if a user is enrolled in a course
 */
export const isUserEnrolled = async (userId, courseId) => {
  const enrollment = await EnrollmentModel.findOne({ user: userId, course: courseId });
  return !!enrollment;
};
