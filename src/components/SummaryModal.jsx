// LEARN: CHECK WHAT FORWARDREF DOES
import { forwardRef, useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ProgressCircle from "./ProgressCircle";
import TodoItem from "./TodoItem";
import List from "@mui/material/List";
import { TodoContext } from "./Todo";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SummaryModal() {
  const {
    summaryOpen,
    setSummaryOpen,
    todos,
    toggleTodo,
    deleteTodo,
    togglePriority,
    handleEditForm,
  } = useContext(TodoContext);

  const totalTodos = todos.length;
  const [doneTodo, setDoneTodo] = useState(0);

  const leftTodos = todos.filter((todo) => todo.done !== true);
  const doneTodos = todos.filter((todo) => todo.done === true);

  useEffect(() => {
    setDoneTodo(doneTodos.length);
  }, [todos]);

  const handleClose = () => {
    setSummaryOpen(false);
  };

  return (
    <>
      <Dialog
        className="bg-blue-100 text-blue-30  p-4 text-4xl flex justify-center items-center"
        open={summaryOpen}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        // Lowest zIndex
        style={{ zIndex: 500 }}
      >
        <DialogTitle className="bg-blue-500 text-blue-50 text-4xl flex justify-center items-center h-1/8">
          Summary view!
        </DialogTitle>
        <DialogContent className="bg-blue-100 text-blue-50">
          <DialogTitle className="bg-blue-400 text-blue-50 rounded-lg text-4xl flex justify-center items-center">
            {leftTodos.length === 0
              ? "EVERYTHING IS DONE, GOOD JOB!"
              : "Tasks left to be done:"}
          </DialogTitle>

          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {leftTodos.map((todo) => {
              // REFACTOR: why if I choose to pass a whole item, I got undefined
              return <TodoItem todo={todo} {...todo} key={todo.id} />;
            })}
          </List>

          {/* PROGRESS CIRCLE */}
          <DialogTitle>{"PROGRESS CIRCLE: "}</DialogTitle>
          <ProgressCircle totalTodos={totalTodos} doneTodo={doneTodo} />

          <DialogTitle>
            {doneTodos.length === 0 ? "GET TO WORK MAN!" : "Tasks done: "}
          </DialogTitle>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {doneTodos.map((todo) => {
              return <TodoItem todo={todo} {...todo} key={todo.id} />;
            })}
          </List>

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}

// TODO: MUI: A component is changing the controlled checked state of SwitchBase to be uncontrolled.
// Elements should not switch from uncontrolled to controlled (or vice versa).
// Decide between using a controlled or uncontrolled SwitchBase element for the lifetime of the component.
// The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.
// OCCURES WHILE SETTING DONE ON AND OFF IN SUMARRY VIEW
