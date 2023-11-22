import dayjs from "dayjs";
import { useEffect, useState, createContext } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import Navigation from "./Navigation";
import EditTodoForm from "./EditTodoForm";
import CalendarModal from "./CalendarModal";
import SummaryModal from "./SummaryModal";
import LoginModal from "./LoginModal";
import dodonedesign from "./../layout/dodone_design.svg";
import useTodoApi from "./API/useTodoApi";

export const TodoContext = createContext();
export const FormContext = createContext();

export default function Todo() {
  // PROPS
  const [newTodoOpen, setNewTodoOpen] = useState(false);
  const [editTodoOpen, setEditTodoOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(true); // LOGIN
  const [editedId, setEditedId] = useState("");
  const [editedName, setEditedName] = useState("");
  const [editedPriority, setEditedPriority] = useState(false);

  // CONTEXT
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [time, setTime] = useState(dayjs(new Date()));

  // NEEDED ONLY IN NEWTODOFORM. IS IT THOUGH?
  const [priority, setPriority] = useState(false);

  // const [editedTodo, setEditedTodo] = useState({});

  const {
    todos,
    getTodos,
    addTodo,
    patchTodo,
    // putTodo,
    toggleTodo,
    togglePriority,
    deleteTodo,
  } = useTodoApi();

  useEffect(() => {
    getTodos();
  }, []);

  // TODO: REFACTOR TO ONE FUNCTION
  // TODO: CHANGE NAME TO HANDLE
  // TODO: ENUM AS A REGULAR JS OBJECT
  const types = {
    type: "1",
  };
  const newTodoFormOpen = () => {
    // set it to !open instead of true
    setNewTodoOpen(!newTodoOpen);
    setCalendarOpen(false);
    setSummaryOpen(false);
    setEditTodoOpen(false);
    setTime(dayjs(new Date()));
    setPriority(false);
  };
  const handleCalendarOpen = (type) => {
    setCalendarOpen(!calendarOpen);
    setNewTodoOpen(false);
    setSummaryOpen(false);
    setEditTodoOpen(false);
  };
  const handleSummaryOpen = () => {
    setSummaryOpen(!summaryOpen);
    setCalendarOpen(false);
    setNewTodoOpen(false);
    setEditTodoOpen(false);
  };

  // REFACTOR: PASS IT AS AN OBJECT, CHANGE NAME
  const handleEditForm = (id, name, priority, dueDate) => {
    // setEditedTodo({
    //   id: id,
    //   name: name,
    //   priority: priority,
    //   dueDate: dueDate,
    //   dateCreated: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    // });
    // setEditedTodo(todos.filter((todo) => todo.id === id));
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
          // global
          calendarOpen,
          setCalendarOpen,
          summaryOpen,
          setSummaryOpen,
          time,
          setTime,
          todos,

          // TODO ITEM
          togglePriority,
          toggleTodo,
          handleEditForm,

          // NAVIGATION
          handleCalendarOpen,
          handleSummaryOpen,
          newTodoFormOpen,
        }}
      >
        <div className="flex justify-center items-center">
          <LoginModal loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
          {!loginOpen && (
            <>
              <TodoList />

              <FormContext.Provider
                value={{
                  // EDIT TODO FORM
                  editedId,
                  editedName,
                  setEditedName,
                  editedPriority,
                  setEditedPriority,
                  editTodoOpen,
                  setEditTodoOpen,
                  // NEW TODO FORM
                  newTodoOpen,
                  setNewTodoOpen,
                  priority,
                  setPriority,
                }}
              >
                <NewTodoForm addTodo={addTodo} />
                <EditTodoForm deleteTodo={deleteTodo} patchTodo={patchTodo} />
              </FormContext.Provider>
              <CalendarModal />
              <SummaryModal />
              <Navigation />
            </>
          )}
        </div>
      </TodoContext.Provider>
    </>
  );
}
