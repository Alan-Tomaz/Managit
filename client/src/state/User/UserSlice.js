import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apiUrl: import.meta.env.VITE_API_PRIVATE_KEY || null,
    templateKey: import.meta.env.VITE_API_TEMPLATE_KEY || null,
}

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
    }
})

export const { } = UserSlice.actions;

export default UserSlice.reducer;