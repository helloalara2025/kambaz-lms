/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║                         USER SCHEMA - MongoDB Model                       ║
 * ║                            Created by Alara                               ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * This defines the structure of a User document in my MongoDB database.
 * Think of it like a blueprint - every user I create will follow this shape.
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: String,
  dob: Date,
  role: { type: String, enum: ["STUDENT", "FACULTY", "ADMIN", "USER"], default: "STUDENT" },
  loginId: String,
  section: String,
  lastActivity: Date,
  totalActivity: String,
}, { collection: "users" });

export default userSchema;
