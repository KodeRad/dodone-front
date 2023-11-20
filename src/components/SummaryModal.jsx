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
  const { summaryOpen, setSummaryOpen, todos } = useContext(TodoContext);

  const totalTodos = todos.length;
  const doneTodos = todos.filter((todo) => todo.done === true);
  const doneTodoNo = doneTodos.length;

  return (
    <>
      <Dialog
        // className="bg-blue-100 text-blue-30 flex justify-center items-center"
        open={summaryOpen}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="summary-modal"
        // Lowest zIndex
        style={{ zIndex: 500 }}
      >
        <DialogTitle className="bg-blue-300 text-blue-50 text-4xl flex justify-center items-center h-1/8">
          Summary view!
          <img
            className="w-32 pl-10"
            src="src/layout/dodone_design.svg"
            alt="DoDone Logo"
          />
        </DialogTitle>
        <DialogContent className="bg-blue-50 text-blue-50">
          {/* <List
            sx={{
              width: "100%",
              maxWidth: 580,
              // height: 300,
              // overflow: scroll,
              backgroundColor: "rgb(147 197 253)",
              marginTop: "3vh",
              // marginBottom: "8vh",
              borderRadius: "10px",
            }}
          > */}
          {/* TODOS UNDONE */}

          {/* // TODO: STICKY NAV TASKS LEFT TO BE DONE */}
          {/* <DialogTitle className="bg-blue-400 text-blue-50 rounded-lg text-4xl flex justify-center items-center">
             {leftTodos.length === 0
                ? "EVERYTHING IS DONE, GOOD JOB!"
                : "Tasks left to be done:"}
            </DialogTitle>
            {leftTodos.map((todo) => {
              // REFACTOR: why if I choose to pass a whole item, I got undefined
              return <TodoItem todo={todo} {...todo} key={todo.id} />;
            })}
          </List> */}

          {/* PROGRESS CIRCLE */}
          <DialogTitle>{"PROGRESS CIRCLE: "}</DialogTitle>
          <ProgressCircle totalTodos={totalTodos} doneTodos={doneTodoNo} />

          {/* TODOS DONE */}
          <List
            sx={{
              width: "100%",
              maxWidth: 580,
              // height: 300,
              // overflow: scroll,
              backgroundColor: "rgb(147 197 253)",
              marginTop: "3vh",
              // marginBottom: "8vh",
              borderRadius: "10px",
            }}
          >
            <DialogTitle>
              {doneTodoNo === 0 ? "GET TO WORK MAN!" : "Tasks done: "}
            </DialogTitle>
            {doneTodos.map((todo) => {
              return <TodoItem todo={todo} {...todo} key={todo.id} />;
            })}
          </List>
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
