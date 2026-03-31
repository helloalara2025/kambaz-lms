// Assignments reducer file
import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: [],
};

// Reducer's initial state w/ default assignments copied from database created.
const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // add new assignment
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableFrom: assignment.availableFrom,
        availableUntil: assignment.availableUntil,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },

    // assignment's ID to delete is in action.payload
    // filter out assignment to delete
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },

    // assignment to update is in action.payload
    // replace assignment whose ID matches action.payload._id
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },

    // select the assignment to edit
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },

    // replaces all assignments with new array in Redux with new data from server
    setAssignments: (state, { payload: assignments}) => {
      state.assignments = assignments;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  setAssignments
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer; // export reducer