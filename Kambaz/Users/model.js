/**
 * User Model - Created by Alara
 * This wraps my schema and gives me methods to interact with the users collection
 */
import mongoose from "mongoose";
import userSchema from "./schema.js";

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
