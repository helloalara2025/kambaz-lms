/**
 * Assignment DAO - Created by Alara
 */
import AssignmentModel from "./model.js";

export const findAssignmentsForCourse = (courseId) => AssignmentModel.find({ course: courseId });

export const findAssignmentById = (assignmentId) => AssignmentModel.findOne({ _id: assignmentId });

export const createAssignment = (assignment) => {
  const newAssignment = { ...assignment, _id: assignment._id || new Date().getTime().toString() };
  return AssignmentModel.create(newAssignment);
};

export const updateAssignment = (assignmentId, assignment) =>
  AssignmentModel.findOneAndUpdate({ _id: assignmentId }, { $set: assignment }, { new: true });

export const deleteAssignment = (assignmentId) => AssignmentModel.findOneAndDelete({ _id: assignmentId });
