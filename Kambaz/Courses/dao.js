/**
 * Course DAO - Created by Alara
 * All my MongoDB queries for courses live here
 */
import CourseModel from "./model.js";

export const findAllCourses = () => CourseModel.find();

export const findCourseById = (courseId) => CourseModel.findOne({ _id: courseId });

export const createCourse = (course) => {
  const newCourse = { ...course, _id: course._id || new Date().getTime().toString() };
  return CourseModel.create(newCourse);
};

export const updateCourse = (courseId, course) =>
  CourseModel.findOneAndUpdate({ _id: courseId }, { $set: course }, { new: true });

export const deleteCourse = (courseId) => CourseModel.findOneAndDelete({ _id: courseId });
