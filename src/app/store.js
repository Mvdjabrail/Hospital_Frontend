import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/userSlice'
import drugsReducer from "../features/drugs/drugsSlice";
import categoriesReducer from "../features/category/categorySlice";
import callRieqReduser from '../features/callRieq/callRieqSlice'
import serviceSlice from "../features/Services/ServicesSlice";
import appointmentsSlice from "../features/appointment/appointmentSlice";
import cartSlice from "../features/Cart/cartSlice";

export const store = configureStore({
    reducer: {
        usersReducer: usersReducer,
        callRieqReduser: callRieqReduser,
        servicesReducer: serviceSlice,
        drugsReducer: drugsReducer,
        categoriesReducer: categoriesReducer,
        appointmentsReducer: appointmentsSlice,
        cartReducer: cartSlice
    }
});
