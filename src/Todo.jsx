import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Navigation from "./Navigation";

// git access
//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

export default function Todo() {
  const [todos, setTodos] = useState([]);

  // 1.  Getting todos from database

  useEffect(() => {
    async function getTodos() {
      const response = await fetch("http://localhost:8080/todos", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });

      const data = await response.json();
      setTodos(data);
    }

    getTodos();
    // Empty dependency for less API calls
  }, []);

  async function addTodo(name, rating = 0, priority = false) {
    try {
      const resp = await fetch("http://localhost:8080/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: name,
          rating: rating,
          priority: priority,
          done: false,
        }),
      });

      if (!resp.ok) throw new Error("Failed to add todo");
      const data = await resp.json();
      if (resp.ok) {
        setTodos((currentTodos) => {
          return [...currentTodos, data];
        });
      }
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  }

  function toggleTodo(id, done) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }
        return todo;
      });
    });
  }

  async function deleteTodo(id) {
    const resp = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    });

    const data = await resp.json();
    console.log(data);

    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      {/* <TodoForm addTodo={addTodo} /> */}
      <Navigation />
    </>
  );
}
