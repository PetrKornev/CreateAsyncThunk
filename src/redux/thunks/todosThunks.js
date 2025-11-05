import { createAsyncThunk } from "@reduxjs/toolkit";
import { todoAPI } from "../../api/api";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, thunkAPI) => {
    try {
      const response = await todoAPI.getTasks();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const addTasks = createAsyncThunk(
  "todos/addTodos",
  async (payload, thunkAPI) => {
    try {
      const response = await todoAPI.addTasks(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const markCompleted = createAsyncThunk(
  "todos/markCompleted",
  async (id, thunkAPI) => {
    try {
      const response = await todoAPI.completeTask(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "todos/deleteTask",
  async (id, thunkAPI) => {
    try {
      const response = await todoAPI.deleteTask(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteCompletedTask = createAsyncThunk(
  "todos/deleteCompletedTasks",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const completedTasks = state.todos.todo.filter((t) => t.isCompleted);

    try {
      await Promise.all(completedTasks.map((t) => todoAPI.deleteTask(t.id)));
      return completedTasks.map((t) => t.id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const editTasks = createAsyncThunk(
  "todos/editTask",
  async (payload, thunkAPI) => {
    try {
      const response = await todoAPI.editTask(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
