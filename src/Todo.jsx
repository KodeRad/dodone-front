import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Navigation from "./Navigation";

// git access
//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

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodoOpen, setNewTodoOpen] = useState(false);

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

  async function addTodo(name, priority = false, dueDate = null) {
    try {
      const resp = await fetch("http://localhost:8080/todos/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name: name,
          dueDate: dueDate,
          priority: priority,
          done: false,
          createdDate: new Date(),
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

  // TODO: ANALIZE HOW IT WORKS
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

  function togglePriority(id, priority) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, priority };
        }
        return todo;
      });
    });
  }

  const todoFormOpen = () => {
    setNewTodoOpen(true);
  };

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
      <h1 className="bg-blue-500 text-white p-4 text-4xl flex justify-center items-center h-1/6">
        DoDone!
      </h1>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        togglePriority={togglePriority}
      />
      <TodoForm
        todoFormOpen={todoFormOpen}
        newTodoOpen={newTodoOpen}
        setNewTodoOpen={setNewTodoOpen}
        addTodo={addTodo}
      />
      <Navigation todoFormOpen={todoFormOpen} />
    </>
  );
}
