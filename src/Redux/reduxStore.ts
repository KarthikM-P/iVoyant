import { configureStore } from "@reduxjs/toolkit";
import  inputs  from "./inputSlicer";

export const store = configureStore({
    reducer: {
        inputsss:inputs
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;