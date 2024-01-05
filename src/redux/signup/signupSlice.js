import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const backendLink = 'https://rails-u6rb.onrender.com/';
// Define the async thunk for logging in
export const signup = createAsyncThunk('auth/signup', async (credentials) => {
  try {
    const response = await axios.post(`${backendLink}signup`, {
      user: {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.password_confirmation,
      },
    });
    return response.headers.authorization;
  } catch (error) {
    throw new Error('Signup failed');
  }
});

// Create the login slice
const signupSlice = createSlice({
  name: 'auth',
  initialState: {
    signupToken: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => ({
        ...state,
        isLoading: true,
        error: null,
      }))
      .addCase(signup.fulfilled, (state, action) => ({
        ...state,
        isLoading: false,
        loginToken: action.payload,
      }))
      .addCase(signup.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

// Export the async thunk and the slice reducer
export default signupSlice.reducer;
