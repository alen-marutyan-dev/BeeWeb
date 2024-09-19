import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signin, signup } from '../thunks/authThunks';
import { AuthState, LoginPayload, SignupPayload } from '@/interfaces/authInterface';
import { setCookie, deleteCookie } from '@/utils/cookieUtils';
import notify from "@/utils/toastify";

const initialState: AuthState = {
    token: null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.error = null;
            deleteCookie('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signin.fulfilled, (state, action: PayloadAction<LoginPayload>) => {
                state.loading = false;
                state.token = action.payload.data.token;
                state.user = action.payload.data.user;

                if (action.payload.data.token) {
                    setCookie('token', action.payload.data.token, 1); // Set cookie for 1 day
                }
                notify.success("Signin successful!");
            })
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error || 'Login failed';
                notify.error(state.error);
            })
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action: PayloadAction<SignupPayload>) => {
                state.loading = false;
                state.token = action.payload.data.token;
                state.user = action.payload.data.user;

                if (action.payload.data.token) {
                    setCookie('token', action.payload.data.token, 1); // Set cookie for 1 day
                }
                notify.success("Signup successful!");
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Signup failed';
                notify.error(state.error);
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
