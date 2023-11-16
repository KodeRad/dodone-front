// TODO: CHECK WHAT FORWARDREF DOES
import { forwardRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import ProgressCircle from "./ProgressCircle";
import TodoItem from "./TodoItem";
import List from "@mui/material/List";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SummaryModal({
  summaryOpen,
  setSummaryOpen,
  todos,
  toggleTodo,
  deleteTodo,
  togglePriority,
  editTodoFormOpen,
}) {
  const totalTodos = todos.length === 0 ? 1 : todos.length;
  const [doneTodo, setDoneTodo] = useState(0);

  const leftTodos = todos.filter((todo) => todo.done !== true);
  const doneTodos = todos.filter((todo) => todo.done === true);

  // TODO: SHOULD IT OBSERVE doneTodos? Then it causing infinite loop
  useEffect(() => {
    setDoneTodo(doneTodos.length === 0 ? 1 : doneTodos.length);
  }, [todos]);

  const handleClose = () => {
    setSummaryOpen(false);
  };

  return (
    <>
      <Dialog
        open={summaryOpen}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        // Lowest zIndex
        style={{ zIndex: 500 }}
      >
        <DialogTitle>{"Summary view!"}</DialogTitle>
        <DialogContent>
          <DialogTitle>{"Tasks left to be done:"}</DialogTitle>
          {leftTodos.length === 0 ? (
            "EVERYTHING IS DONE, GOOD JOB!"
          ) : (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {leftTodos.map((todo) => {
                return (
                  <TodoItem
                    {...todo}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                    togglePriority={togglePriority}
                    // TODO: THE EDIT MODAL SHOWS UNDERNEETH
                    editTodoFormOpen={editTodoFormOpen}
                    key={todo.id}
                  />
                );
              })}
            </List>
          )}

          <DialogTitle>{"Tasks done: "}</DialogTitle>
          {/* TODOS.FILTER(DONE)  */}
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            {/* CREATE A NICER ADNOTATION IF NO TODOS */}
            {todos.length === 0 && "EVERYTHING IS DONE, GOOD JOB!"}
            {doneTodos.map((todo) => {
              return (
                <TodoItem
                  {...todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  togglePriority={togglePriority}
                  editTodoFormOpen={editTodoFormOpen}
                  key={todo.id}
                />
              );
            })}
          </List>

          {/* PROGRESS CIRCLE */}
          <DialogTitle>{"PROGRESS CIRCLE: "}</DialogTitle>
          <ProgressCircle totalTodos={totalTodos} doneTodo={doneTodo} />

          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
