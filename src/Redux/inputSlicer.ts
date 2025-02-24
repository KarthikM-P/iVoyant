import { createSlice } from "@reduxjs/toolkit";


export const inputs = createSlice({
    
    name: 'input',
    initialState : {
        name: '',
        email: '',
        password: '',
    },
    reducers: {
        inputName: (state, action) => {
            state.name = action.payload
        },
        inputEmail: (state, action) => {
            state.email = action.payload
        },
        inputPassword: (state, action) => {
            state.password = action.payload
        }
    }
});

export const {inputName, inputEmail, inputPassword} = inputs.actions;

export default inputs.reducer
