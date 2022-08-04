import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/userSlice";
import drugsReducer from "../features/drugs/drugsSlice";
import categoriesReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    usersReducer: usersReducer,
    drugsReducer: drugsReducer,
    categoriesReducer: categoriesReducer,
  },
});
