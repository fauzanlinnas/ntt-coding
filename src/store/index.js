import { configureStore } from "@reduxjs/toolkit";

import courses from "./slices/courseSlice";

const store = configureStore({
  reducer: {
    courses,
  },
});

export default store;
