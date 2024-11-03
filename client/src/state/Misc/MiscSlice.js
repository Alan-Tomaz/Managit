import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apiUrl: import.meta.env.VITE_API_URL || "http://localhost",
    apiPort: import.meta.env.VITE_API_PORT || "",
    timeouts: []
}

console.log(import.meta.env)

const MiscSlice = createSlice({
    name: "Misc",
    initialState,
    reducers: {
    }
})

export const { } = MiscSlice.actions;

export default MiscSlice.reducer;