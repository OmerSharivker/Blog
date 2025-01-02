import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

interface UserState {
    email: string;
    password: string;
    accessToken: string;
    refreshTokens: string[];
    image: string;
    userName: string;
    errorMessage: string; 
    successMessage: string; 
}


export const register = createAsyncThunk(
    'user/register',
    async (userData: { email: string; password: string; userName: string }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/auth/register', userData);
            return fulfillWithValue(data);
        } catch (error : any) {
            return rejectWithValue(error.response.data.error || 'Registration failed');
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async (userData: { email: string; password: string }, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/auth/login', userData);
            return fulfillWithValue(data);
        } catch (error : any) {
            return rejectWithValue(error.response.data.error || 'Login failed');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        password: '',
        accessToken: '',
        refreshTokens: [],
        image: '',
        userName: '',
        errorMessage: '',
        successMessage: '',
    } as UserState,
    reducers: {       
        messageClear: (state) => {
            state.errorMessage = "";
            state.successMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message; 
            state.image = payload.image;
        })
        .addCase(register.rejected, (state, { payload }) => {
            state.errorMessage = payload as string;
        })
        .addCase(login.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message;
            localStorage.setItem('accessToken', payload.accessToken);
            localStorage.setItem('refreshTokens', payload.refreshToken);
            localStorage.setItem('accessTokenExpiry', (Date.now() + 3600000).toString());
            localStorage.setItem('refreshTokenExpiry', (Date.now() + 7 * 24 * 60 * 60 * 1000).toString());
           

        })
        .addCase(login.rejected, (state, { payload }) => {
            state.errorMessage = payload as string;
        });
    },
});

export const {messageClear} = userSlice.actions;
export default userSlice.reducer;