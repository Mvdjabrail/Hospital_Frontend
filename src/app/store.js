import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/userSlice'
import departmentSlice from "../features/departments/depsSlice";
import callRieqReduser from '../features/callRieq/callRieqSlice'
import serviceSlice from "../features/Services/Services";

export const store = configureStore({
    reducer: {
        usersReducer: usersReducer,
        deps: departmentSlice,
        callRieqReduser: callRieqReduser,
        servicesReducer: serviceSlice
    }
});