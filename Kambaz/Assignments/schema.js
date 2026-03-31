/**
 * Assignment Schema - Created by Alara
 */
import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  course: { type: String, ref: "Course", required: true },
  points: { type: Number, default: 100 },
  dueDate: String,
  availableFrom: String,
  availableUntil: String,
}, { collection: "assignments" });

export default assignmentSchema;
