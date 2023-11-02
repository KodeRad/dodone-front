import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

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
  }, [todos]);

  // TODO: RETURN THE PREV ARRAY WITH NEW ENTRY
  function addTodo(name, rating = 0, priority = false) {
    async function postTodo() {
      try {
        const resp = await fetch("http://localhost:8080/todos/single", {
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
        console.log(data);
      } catch (error) {
        console.error("Error adding todo: ", error);
      }
    }
    postTodo();
  }
  // function addTodo(title) {
  //   setTodos((currentTodos) => {
  //     return [
  //       ...currentTodos,
  //       { id: crypto.randomUUID(), title, completed: false },
  //     ];
  //   });
  // }

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

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      {/* <div>
        <p>{console.log(todos)}</p>
      </div> */}
    </>
  );
}
