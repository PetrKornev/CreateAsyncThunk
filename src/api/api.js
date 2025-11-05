import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const todoAPI = {
  login(payload) {
    return api.post("/auth/login", payload);
  },
  register(payload) {
    return api.post("/users/register", payload);
  },
  getTasks() {
    return api.get("/todos");
  },
  addTasks(payload) {
    return api.post("/todos", payload);
  },
  completeTask(id) {
    return api.patch(`/todos/${id}/isCompleted`);
  },
  deleteTask(id) {
    return api.delete(`/todos/${id}`);
  },
  editTask(payload) {
    return api.patch(`/todos/${payload.id}`, { title: payload.title });
  },
};

export default api;
