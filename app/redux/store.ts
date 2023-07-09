import { configureStore } from "@reduxjs/toolkit";
import createQuizSlice from "./features/editQuiz";


const store = configureStore({
    reducer: {
        'createQuiz': createQuizSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;