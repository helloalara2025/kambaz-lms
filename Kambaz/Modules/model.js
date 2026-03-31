import mongoose from "mongoose";
import moduleSchema from "./schema.js";

const ModuleModel = mongoose.model("Module", moduleSchema);
export default ModuleModel;
