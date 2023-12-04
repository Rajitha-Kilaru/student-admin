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
  },
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = {
        token: null,
        user: null,
      };
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

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
