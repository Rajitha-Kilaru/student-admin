import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {
      token: null,
      user: null,
    },
    error: null,
    studentsDetails: null,
  },
  reducers: {
    login: (state, action) => {
      state.data = {
        token:  action.payload.token,
        user:  action.payload,
      };
    },
    logout: (state) => {
      state.data = {
        token: null,
        user: null,
      };
    },
    getStudentDetails: (state, action) => {
      state.studentsDetails = action.payload;
    },
  },
  //   extraReducers: builder => {
  //     builder
  //       .addCase(loginUser.fulfilled, (state, action) => {
  //         state.data = action.payload;
  //       })
  //       .addCase(loginUser.rejected, (state, action) => {
  //         state.error = action.error.message;
  //       });
  //   }
});

export const { login, logout, getStudentDetails } = userSlice.actions;

export default userSlice.reducer;
