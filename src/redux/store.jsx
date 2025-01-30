
import { configureStore } from "@reduxjs/toolkit";
import coinReducer from "./coinSlice"

const store = configureStore({
    reducer: {
        coinSlice: coinReducer,
    }
})

export default store;