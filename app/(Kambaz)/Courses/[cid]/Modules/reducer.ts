// Modules reducer file
import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../../Database";

import { v4 as uuidv4 } from "uuid";
const initialState = {
  modules: [],
};

// Reducer's initial state w/ default modules copied from database created.
const modulesSlice = createSlice({
  // create slice
  // name the slice
  // set initial state
  // declare reducer functions
  // new module is in action.payload
  // update modules in state adding new module
  // at beginning of array. Override _id with
  // timestamp
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },

    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: uuidv4(),
        lessons: [],
        name: module.name,
        course: module.course,
      };
      state.modules = [...state.modules, newModule] as any;
    },

    // module's ID to delete is in action.payload
    // filter out module to delete

    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m: any) => m._id !== moduleId);
    },
    // module to update is in action.payload
    // replace module whose ID matches
    // action.payload._id

    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },

    // select the module to edit
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
  },
});

// export all reducer functions
export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;

export default modulesSlice.reducer; // export reducer
