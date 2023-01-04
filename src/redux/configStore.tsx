import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import coursesReducer from "./reducers/coursesReducer";
import listCoursesReducer from "./reducers/listCoursesReducer";
import listCourses from "./reducers/listCoursesReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
  coursesReducer,
  listCoursesReducer,
  userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
