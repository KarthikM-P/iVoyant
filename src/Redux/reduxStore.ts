import { configureStore } from "@reduxjs/toolkit";
import  inputs  from "./inputSlicer";

export const store = configureStore({
    reducer: {
        inputsss:inputs
    },
})