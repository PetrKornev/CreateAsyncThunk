import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoAPI } from "../../api/api";
import { act } from "react";

export const getToken = createAsyncThunk(
  "auth/getToken",
  async (payload, thunkAPI) => {
    try {
      const { data } = await todoAPI.login(payload);
      localStorage.setItem("token", data.token);
      return data.token;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Ошибка авторизации"
      );
    }
  }
);

export const registration = createAsyncThunk(
  "auth/registration",
  async (payload, thunkAPI) => {
    try {
      const response = await todoAPI.register(payload);
      return response.data;
    } catch (error) {
      return (
        thunkAPI.rejectWithValue(error.response?.data) || "Ошибка регистрации"
      );
    }
  }
);

const initialState = {
  token: localStorage.getItem("token") || "",
  loading: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      localStorage.removeItem("token");
    },
    clearMessage: (state) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(getToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.message = action.payload.message || "Вход выполнен успешно";
      })
      .addCase(getToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Ошибка авторизации";
      });

    builder
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.token) {
          state.token = action.payload.token;
        }
        state.message =
          action.payload?.message || "Регистрация прошла успешно!";
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Ошибка при регистрации пользователя";
      });
  },
});

export const { logout, clearMessage } = authSlice.actions;
export default authSlice.reducer;
