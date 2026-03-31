// Redux state management
// Statue updates (add, delete, update quizzes)
// Pure Redux logic
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
};

// Reducer initial state for quizzes
const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    // Replace quizzes with new array from server
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    // Add new quiz
    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz] as any;
    },

    // Filter out quiz by ID to delete
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (q: any) => q._id !== quizId
      );
    },

    // Replace quiz whose ID matches action.payload._id
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },

     // Select the quiz to edit
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, editing: true } : q
      ) as any;
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, editQuiz } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;