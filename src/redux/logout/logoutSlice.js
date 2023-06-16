import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    const token = localStorage.getItem('token');

    // Clear the token from local storage
    localStorage.removeItem('token');

    // Make the logout request to the backend
    await axios.delete('http://localhost:3000/logout', {
      headers: {
        Authorization: token,
      },
    });
  }
);

const logoutSlice = createSlice({
  name: 'auth',
  initialState: {
    logoutToken: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.logoutToken = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default logoutSlice.reducer;
