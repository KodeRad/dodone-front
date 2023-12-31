import dayjs from "dayjs";
import React, { useState } from "react";

const useTodoApi = () => {
  const [todos, setTodos] = useState([]);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async (url, method, data = null) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      };

      const options = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }

      return method === "DELETE" ? null : await response.json();
    } catch (error) {
      console.error("API error:", error);
      throw error;
    }
  };

  const getTodos = async () => {
    try {
      const data = await fetchData(apiUrl, "GET");
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos: ", error);
    }
  };

  const addTodo = async (name, priority = false, dueDate = null) => {
    try {
      const data = await fetchData(apiUrl + "/add", "POST", {
        name,
        dueDate: dayjs(dueDate).format("YYYY-MM-DD HH:mm:ss"),
        priority,
        done: false,
        createdDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
      });

      setTodos((currentTodos) => [...currentTodos, data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const putTodo = async (id, name, priority, dueDate, createdDate) => {
    try {
      const data = await fetchData(`${apiUrl}/${id}`, "PUT", {
        name,
        dueDate,
        createdDate,
        priority,
        done: false,
      });

      setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id === id ? data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const patchTodo = async (id, name, priority, dueDate) => {
    try {
      const data = await fetchData(`${apiUrl}/${id}`, "PATCH", {
        name,
        dueDate,
        priority,
        done: false,
      });

      setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id === id ? data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const toggleTodo = async (id, done) => {
    try {
      const data = await fetchData(`${apiUrl}/${id}`, "PATCH", { done });

      setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo.id === id ? { ...todo, done } : todo))
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const togglePriority = async (id, priority) => {
    try {
      const data = await fetchData(`${apiUrl}/${id}`, "PATCH", { priority });

      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === id ? { ...todo, priority } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling priority:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetchData(`${apiUrl}/${id}`, "DELETE");

      setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return {
    todos,
    getTodos,
    addTodo,
    patchTodo,
    toggleTodo,
    togglePriority,
    deleteTodo,
    putTodo,
  };
};

export default useTodoApi;
