import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../features/users/userSlice'
import drugsReducer from "../features/drugs/drugsSlice";
import categoriesReducer from "../features/category/categorySlice";
import callRieqReduser from '../features/callRieq/callRieqSlice'
import serviceSlice from "../features/Services/ServicesSlice";
import cartSlice from "../features/Cart/cartSlice";
import reviewsSlice from "../features/Reviews/reviewsSlice";

export const store = configureStore({
    reducer: {
        usersReducer: usersReducer,
        callRieqReduser: callRieqReduser,
        servicesReducer: serviceSlice,
        drugsReducer: drugsReducer,
        categoriesReducer: categoriesReducer,
        cartReducer: cartSlice,
        reviewReducer: reviewsSlice,
    }
});


