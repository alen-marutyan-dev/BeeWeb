import {createAsyncThunk} from '@reduxjs/toolkit';
import {AuthService} from "@/services/authService";
import {AuthResponse} from "@/interfaces/authInterface";


export const signup = createAsyncThunk<AuthResponse, { email: string; password: string, fullName: string }>(
    'auth/signup',
    async ({ email, password, fullName }, thunkAPI) => {
        try {
            return await AuthService.signup(email, password, fullName);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);
export const signin = createAsyncThunk<AuthResponse, { email: string; password: string }>(
    'auth/login',
    async ({ email, password }, thunkAPI) => {
        try {
            return await AuthService.login(email, password);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);


