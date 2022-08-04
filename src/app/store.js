import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users/userSlice";
import drugsReducer from "../features/drugs/drugsSlice";
import categoriesReducer from "../features/category/categorySlice";
import departmentSlice from "../features/departments/depsSlice";
import callRieqReduser from '../features/callRieq/callRieqSlice'


export const store = configureStore({
  reducer: {
    usersReducer: usersReducer,
    drugsReducer: drugsReducer,
    categoriesReducer: categoriesReducer,
    deps: departmentSlice,
    callRieqReduser: callRieqReduser,
  },
});
