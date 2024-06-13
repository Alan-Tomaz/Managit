import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null
}

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    }
})

export const { setLogin } = UserSlice.actions;

export default UserSlice.reducer;