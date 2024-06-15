import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apiUrl: import.meta.env.VITE_API_PRIVATE_KEY || "http://localhost",
    apiPort: import.meta.env.VITE_API_TEMPLATE_KEY || "3000",
    timeouts: []
}

const MiscSlice = createSlice({
    name: "Misc",
    initialState,
    reducers: {
    }
})

export const { } = MiscSlice.actions;

export default MiscSlice.reducer;