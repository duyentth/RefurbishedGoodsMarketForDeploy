import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
    name: "loader",
    initialState: {
        loading: false,
    },
    reducers: {
        SetLoader: (state,action) =>{
            state.loading = action.payload;
        }
    }
})

export const {SetLoader} = loaderSlice.actions;