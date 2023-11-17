import dayjs from "dayjs";
import { useEffect, useState, createContext } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Navigation from "./Navigation";
import EditTodoForm from "./EditTodoForm";
import CalendarModal from "./CalendarModal";
import SummaryModal from "./SummaryModal";
import getTodos from "./APIQueries/getTodos";
import DownloadButton from "./ICSButton";

// TODO: DELETE THIS SHAJT
// git access
//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

export const TodoContext = createContext();

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodoOpen, setNewTodoOpen] = useState(false);
  const [editTodoOpen, setEditNewTodoOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [editedId, setEditedId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedPriority, setEditedPriority] = useState(false);

  // Getting todos from database
  useEffect(() => {
    getTodos(setTodos);
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
          createdDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        }),
      });

      if (!resp.ok) throw new Error("Failed to add todo");
      const data = await resp.json();
      // CONSOLE LOG TO BE DELETED
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
        return todo.id === id ? data : todo;
      });
    });
    // setTodos((currentTodos) => {
    //   return currentTodos.map((todo) => {
    //     if (todo.id === id) {
    //       return { ...todo, data };
    //     }
    //     return todo;
    //   });
    // });
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
    await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
    });

    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  // TODO: REFACTOR TO ONE FUNCTION
  // TODO: CHANGE NAME TO HANDLE
  const todoFormOpen = () => {
    // set it to !open instead of true
    setNewTodoOpen(!newTodoOpen);
    setCalendarOpen(false);
    setSummaryOpen(false);
  };
  const handleCalendarOpen = () => {
    setCalendarOpen(!calendarOpen);
    setNewTodoOpen(false);
    setSummaryOpen(false);
  };
  const handleSummaryOpen = () => {
    setSummaryOpen(!summaryOpen);
    setCalendarOpen(false);
    setNewTodoOpen(false);
  };

  // TODO: CHANGE NAME TO HANDLE
  const editTodoFormOpen = (id, name, priority) => {
    setEditedId(id);
    setEditedName(name);
    setEditedPriority(priority);
    setEditNewTodoOpen(true);
  };

  return (
    <>
      <h1 className="bg-blue-500 text-white p-4 text-4xl flex justify-center items-center h-1/6">
        DoDone!
      </h1>

      <TodoContext.Provider
        value={{
          addTodo,
          calendarOpen,
          deleteTodo,
          editedId,
          editedName,
          editedPriority,
          editTodoFormOpen,
          editTodoOpen,
          handleCalendarOpen,
          handleSummaryOpen,
          newTodoOpen,
          patchTodo,
          setCalendarOpen,
          setEditNewTodoOpen,
          setNewTodoOpen,
          setSummaryOpen,
          summaryOpen,
          todos,
          togglePriority,
          toggleTodo,
          todoFormOpen,
        }}
      >
        <TodoList />
        <TodoForm />
        <EditTodoForm />
        <CalendarModal />
        <SummaryModal />
        <DownloadButton todos={todos} />
        <Navigation />
      </TodoContext.Provider>
    </>
  );
}
