import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: any | null;
    permissions: string[];
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    permissions: [],
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: any }>
        ) => {
            const { user } = action.payload;
            state.user = user;
            state.isAuthenticated = true;
        },
        setPermissions: (state, action: PayloadAction<string[]>) => {
            state.permissions = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.permissions = [];
            state.isAuthenticated = false;
        },
    },
});

export const { setCredentials, setPermissions, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentPermissions = (state: any) => state.auth.permissions;
export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;
