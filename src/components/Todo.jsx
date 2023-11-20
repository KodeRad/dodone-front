import dayjs from "dayjs";
import { useEffect, useState, createContext } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import Navigation from "./Navigation";
import EditTodoForm from "./EditTodoForm";
import CalendarModal from "./CalendarModal";
import SummaryModal from "./SummaryModal";
import getTodos from "./API/getTodos";
import LoginModal from "./LoginModal";
import { DialogTitle } from "@mui/material";
import dodonedesign from "./../layout/dodone_design.svg";

export const TodoContext = createContext();

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodoOpen, setNewTodoOpen] = useState(false);
  const [editTodoOpen, setEditTodoOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  // TODO: CHANGE STATE TO TRUE FOR LOGIN WINDOW
  const [loginOpen, setLoginOpen] = useState(true);
  const [priority, setPriority] = useState(false);
  const [time, setTime] = useState(dayjs(new Date()));

  const [editedId, setEditedId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedPriority, setEditedPriority] = useState(false);
  // const [editedDueDate, setEditedDueDate] = useState("");

  // TODO: CUSTOM HOOK WITH ALL THE LOGIC THAT RETURNS WHATEVER YOU NEED (AS AN OBJECT) EXAMPLES: REACT USE LIBRARY
  // Getting todos from database
  useEffect(() => {
    getTodos(setTodos);
  }, []);

  // example custom hook
  // const dupa = useDupa(id)

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
          dueDate: dayjs(dueDate).format("YYYY-MM-DD HH:mm:ss"),
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

  // TODO: ENUM AS A REGULAR JS OBJECT
  const types = {
    DUPA: "DUPA",
  };

  // TODO: REFACTOR TO ONE FUNCTION
  // TODO: CHANGE NAME TO HANDLE
  const newTodoFormOpen = () => {
    // set it to !open instead of true
    setNewTodoOpen(!newTodoOpen);
    setCalendarOpen(false);
    setSummaryOpen(false);
    setTime(dayjs(new Date()));
    setPriority(false);
  };
  const handleCalendarOpen = (type) => {
    setCalendarOpen(!calendarOpen);
    setNewTodoOpen(false);
    setSummaryOpen(false);
  };
  const handleSummaryOpen = () => {
    setSummaryOpen(!summaryOpen);
    setCalendarOpen(false);
    setNewTodoOpen(false);
  };

  // REFACTOR: PASS IT AS AN OBJECT, CHANGE NAME
  const handleEditForm = (id, name, priority, dueDate) => {
    // REFACTOR: setEditedObject and then use it for less code
    setTime(dayjs(dueDate));
    setEditedId(id);
    setEditedName(name);
    setEditedPriority(priority);
    setEditTodoOpen(true);
  };

  return (
    <>
      <h1 className="bg-blue-300 flex justify-center items-center h-1/6 fixed w-full top-0 z-10">
        <img src={dodonedesign} alt="DoDone Logo" />
      </h1>

      {/* TODO: GET RID OF SOME OF THE ELEMENTS */}
      <TodoContext.Provider
        value={{
          addTodo,
          calendarOpen,
          deleteTodo,
          // editedDueDate,
          editedId,
          editedName,
          editedPriority,
          handleEditForm,
          editTodoOpen,
          handleCalendarOpen,
          handleSummaryOpen,
          newTodoOpen,
          patchTodo,
          setCalendarOpen,
          setEditTodoOpen,
          setNewTodoOpen,
          setSummaryOpen,
          summaryOpen,
          todos,
          togglePriority,
          toggleTodo,
          newTodoFormOpen,
          time,
          setTime,
          setEditedName,
          setEditedPriority,
          priority,
          setPriority,
          loginOpen,
          setLoginOpen,
        }}
      >
        <div className="flex justify-center items-center">
          <LoginModal />
          {!loginOpen ? (
            <>
              <TodoList />
              <NewTodoForm />
              <EditTodoForm />
              <CalendarModal />
              <SummaryModal />
              <Navigation />
            </>
          ) : null}
        </div>
      </TodoContext.Provider>
    </>
  );
}
