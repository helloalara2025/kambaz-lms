/**
 * Module DAO - Created by Alara
 */
import ModuleModel from "./model.js";

export const findModulesForCourse = (courseId) => ModuleModel.find({ course: courseId });

export const createModule = (module) => {
  const newModule = { ...module, _id: module._id || new Date().getTime().toString() };
  return ModuleModel.create(newModule);
};

export const updateModule = (moduleId, module) =>
  ModuleModel.findOneAndUpdate({ _id: moduleId }, { $set: module }, { new: true });

export const deleteModule = (moduleId) => ModuleModel.findOneAndDelete({ _id: moduleId });
