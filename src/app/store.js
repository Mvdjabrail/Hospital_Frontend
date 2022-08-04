import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/userSlice'
import callRieqReduser from '../features/callRieq/callRieqSlice'


export const store = configureStore({
    reducer: {
        usersReducer: usersReducer,
        callRieqReduser: callRieqReduser

    }
});