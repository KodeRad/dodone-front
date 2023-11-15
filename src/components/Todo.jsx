import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Navigation from "./Navigation";
import EditTodoForm from "./EditTodoForm";
import CalendarList from "./CalendarList";
import CalendarModal from "./CalendarModal";
import moment from "moment";
import SummaryModal from "./SummaryModal";

// git access
//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

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodoOpen, setNewTodoOpen] = useState(false);
  const [editTodoOpen, setEditNewTodoOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [editedId, setEditedId] = useState("");

  // Getting todos from database
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
          createdDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        }),
      });

      if (!resp.ok) throw new Error("Failed to add todo");
      const data = await resp.json();
      console.log(data);
      if (resp.ok) {
        setTodos((currentTodos) => {
          return [...currentTodos, data];
        });
      }
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  }

  // patchTodo
  async function patchTodo(id, name, priority, dueDate) {
    const resp = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: name,
        dueDate: dueDate,
        priority: priority,
        done: false,
      }),
    });

    // Should it return the changed todo?
    const data = await resp.json();
    console.log(data);

    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, data };
        }
        return todo;
      });
    });
  }

  // TODO: EXTRACT THE FETCH FUNCTION FOR TOGGLETODO AND PRIORITY
  async function toggleTodo(id, done) {
    const resp = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        done: done,
      }),
    });

    // Should it return the changed todo?
    const data = await resp.json();
    console.log(data);

    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, done };
        }
        return todo;
      });
    });
  }

  // TODO: EXTRACT THE FETCH FUNCTION FOR TOGGLETODO AND PRIORITY
  async function togglePriority(id, priority) {
    const resp = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        priority: priority,
      }),
    });

    // Should it return the changed todo?
    const data = await resp.json();
    console.log(data);

    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, priority };
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

  // TODO: CHANGE NAM
  // TODO: CHANGE NAME TO HANDLE
  const todoFormOpen = () => {
    setNewTodoOpen(true);
  };
  const handleCalendarOpen = () => {
    setCalendarOpen(true);
  };
  const handleSummaryOpen = () => {
    setSummaryOpen(true);
  };

  // TODO: CHANGE NAME TO HANDLE
  const editTodoFormOpen = (id) => {
    setEditedId(id);
    setEditNewTodoOpen(true);
  };

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
        editTodoFormOpen={editTodoFormOpen}
      />
      <TodoForm
        todoFormOpen={todoFormOpen}
        newTodoOpen={newTodoOpen}
        setNewTodoOpen={setNewTodoOpen}
        addTodo={addTodo}
      />
      <EditTodoForm
        // TODO: CREATE PORTAL
        editTodoFormOpen={editTodoFormOpen}
        editTodoOpen={editTodoOpen}
        setEditNewTodoOpen={setEditNewTodoOpen}
        patchTodo={patchTodo}
        editedId={editedId}
      />
      <CalendarModal
        todos={todos}
        calendarOpen={calendarOpen}
        setCalendarOpen={setCalendarOpen}
        handleCalendarOpen={handleCalendarOpen}
      />
      <SummaryModal
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        togglePriority={togglePriority}
        editTodoFormOpen={editTodoFormOpen}
        summaryOpen={summaryOpen}
        setSummaryOpen={setSummaryOpen}
        handleSummaryOpen={handleSummaryOpen}
      />
      <Navigation
        todoFormOpen={todoFormOpen}
        handleSummaryOpen={handleSummaryOpen}
        handleCalendarOpen={handleCalendarOpen}
      />
    </>
  );
}
