import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/auth";
import cartReducer from "./reducer/cart";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer
    },
});
export default store;