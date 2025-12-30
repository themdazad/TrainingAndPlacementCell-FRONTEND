import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice(
   {
    name: "auth",
    initialState:{
        isAuthenticated: false,
        user: null,
    },
    reducers:{
        setAuthState: (state, action) => { // isme data aayega payload ke through
            const { isAuthenticated, user } = action.payload;
            state.isAuthenticated = isAuthenticated;
            state.user = user;
        },
        logout:(state)=>{ // logout karne pe state reset kar dena without payload
            state.isAuthenticated = false;
            state.user = null; 
        },
    }
   }    
)


export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;