/*******************************************
 * Enrollments Reducer - Alara Hakki
 * 
 * This is my Redux slice for enrollments.
 * I handle setting, adding, and deleting enrollments.
 * The deleteEnrollment handles both populated and unpopulated data.
 *******************************************/
import { createSlice } from "@reduxjs/toolkit";

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: { enrollments: [] as any[] },
  reducers: {
    /* I set all enrollments from backend */
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    
    /* I add a new enrollment to the list */
    addEnrollment: (state, action) => {
      state.enrollments.push(action.payload);
    },
    
    /* I delete enrollment - handles multiple data formats from backend */
    deleteEnrollment: (state, action) => {
      state.enrollments = state.enrollments.filter(
        (e) => {
          /* Check all possible combinations of populated vs unpopulated data */
          const userMatch = e.user === action.payload.userId || e.user?._id === action.payload.userId;
          const courseMatch = e.course === action.payload.courseId || e.course?._id === action.payload.courseId;
          return !(userMatch && courseMatch);
        }
      );
    },
  },
});

export const { setEnrollments, addEnrollment, deleteEnrollment } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;