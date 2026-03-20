import { defineStore } from "pinia";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [],
  }),
  getters: {
    countTodos: (state) => state.todos.length,
  },
  actions: {
    async fetchTodos() {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        this.todos = response.data;
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    },
    async toggleStatus(id) {
      const foundTask = this.todos.find((todo) => todo.id == id);
      if (!foundTask) {
        return;
      }

      try {
        const completedAt =
          foundTask.completedAt != null ? null : new Date().toISOString();
        const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, {
          completedAt,
        });
        const updatedTask = response.data;
        const taskIndex = this.todos.findIndex((todo) => todo.id == id);
        if (taskIndex >= 0) {
          this.todos[taskIndex] = updatedTask;
          this.todos = [...this.todos];
        }
      } catch (error) {
        console.error("Failed to update todo status:", error);
      }
    },
    async addTodo(todoName) {
      if (!todoName || !todoName.trim()) {
        return;
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/tasks`, {
          name: todoName.trim(),
          description: "description",
          completedAt: null,
        });
        this.todos.push(response.data);
      } catch (error) {
        console.error("Failed to add todo:", error);
      }
    },
    async clearAll() {
      try {
        await Promise.all(
          this.todos.map((todo) => axios.delete(`${API_BASE_URL}/tasks/${todo.id}`)),
        );
        this.todos = [];
      } catch (error) {
        console.error("Failed to clear todos:", error);
      }
    },
  },
});
