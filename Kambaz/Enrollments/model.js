import mongoose from "mongoose";
import enrollmentSchema from "./schema.js";

const EnrollmentModel = mongoose.model("Enrollment", enrollmentSchema);
export default EnrollmentModel;
