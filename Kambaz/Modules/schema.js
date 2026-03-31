/**
 * Module Schema - Created by Alara
 * Modules belong to courses and contain lessons
 */
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  module: String,
});

const moduleSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: String,
  course: { type: String, ref: "Course", required: true },
  lessons: [lessonSchema],
}, { collection: "modules" });

export default moduleSchema;
