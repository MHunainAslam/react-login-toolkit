import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authApis";

export const login = createAsyncThunk(
    'auth/login',
    async (logindata, { rejectWithValue }) => {
        try {
            const data = await loginUser(logindata);
            return data;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Error creating order");
        }
    }
);

const initialState = {
    isLoading: false,
    isError: null,
    data: JSON.parse(localStorage.getItem('authData')) || null,
    isAuthenticated: Boolean(localStorage.getItem('isAuthenticated')),
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //login
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.data = payload
                state.isLoading = false
                state.isAuthenticated = false
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isAuthenticated = true
                state.isLoading = false
                state.isError = payload
                localStorage.setItem("authData", JSON.stringify(payload));
                localStorage.setItem("isAuthenticated", "true");
            })

    }
})
export default authSlice.reducer;
