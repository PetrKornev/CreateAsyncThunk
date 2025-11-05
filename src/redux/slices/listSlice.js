import {
  createSlice,
  isPending,
  isRejected,
  isFulfilled,
} from "@reduxjs/toolkit";
import {
  getTodos,
  addTasks,
  markCompleted,
  deleteTask,
  deleteCompletedTask,
  editTasks,
} from "../thunks/todosThunks";

const listSlice = createSlice({
  name: "todos",
  initialState: {
    todo: [],
    loading: false,
    filter: "all",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todo = action.payload;
    });

    builder.addCase(addTasks.fulfilled, (state, action) => {
      state.todo.push(action.payload);
    });

    builder.addCase(markCompleted.fulfilled, (state, action) => {
      const task = state.todo.find((item) => item.id === action.meta.arg);
      if (task) {
        task.isCompleted = !task.isCompleted;
      }
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.todo = state.todo.filter((item) => item.id !== action.meta.arg);
    });

    builder.addCase(deleteCompletedTask.fulfilled, (state, action) => {
      state.todo = state.todo.filter(
        (item) => !action.payload.includes(item.id)
      );
    });

    builder.addCase(editTasks.fulfilled, (state, action) => {
      const index = state.todo.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.todo[index] = action.payload;
      }
    });

    builder.addMatcher(
      isPending(
        getTodos,
        addTasks,
        markCompleted,
        deleteTask,
        deleteCompletedTask,
        editTasks
      ),
      (state) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      isRejected(
        getTodos,
        addTasks,
        markCompleted,
        deleteTask,
        deleteCompletedTask,
        editTasks
      ),
      (state) => {
        state.loading = false;
      }
    );

    builder.addMatcher(
      isFulfilled(
        getTodos,
        addTasks,
        markCompleted,
        deleteTask,
        deleteCompletedTask,
        editTasks
      ),
      (state) => {
        state.loading = false;
      }
    );
  },
});

export default listSlice.reducer;
export const { setFilter } = listSlice.actions;
