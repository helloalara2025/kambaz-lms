/**
 * Course Schema - Created by Alara
 * Defines the structure of course documents in MongoDB
 */
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  number: String,
  startDate: String,
  endDate: String,
  description: String,
  image: String,
}, { collection: "courses" });

export default courseSchema;
