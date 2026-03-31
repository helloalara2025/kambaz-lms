/**
 * Enrollment Schema - Created by Alara
 * This is the many-to-many relationship between users and courses
 */
import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  user: { type: String, ref: "User", required: true },
  course: { type: String, ref: "Course", required: true },
}, { collection: "enrollments" });

// Compound index to prevent duplicate enrollments
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });

export default enrollmentSchema;
