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
        },
        setData: (state, action) => {
            state.user = action.payload.user
        },
        logout: (state, action) => {
            state.user = null;
            state.token = null;
        }
    }
})

export const { setLogin, setData, logout } = UserSlice.actions;

export default UserSlice.reducer;