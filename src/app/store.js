import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import videosReducer from "../features/videos/videosSlice";
import quizesSliceReducer from "../features/quizes/quizesSlice";
import rankingSliceReducer from "../features/ranking/rankingSlice";
import assignmentsMarkSliceReducer from "../features/assignmentMarks/assignmentsMarksSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    videos: videosReducer,
    videoQuizes: quizesSliceReducer,
    ranking: rankingSliceReducer,
    assignmentsMark: assignmentsMarkSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
