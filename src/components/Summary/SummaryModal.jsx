// LEARN: CHECK WHAT FORWARDREF DOES
import { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ProgressCircle from "./ProgressCircle";
import TodoItem from "../Main/TodoItem";
import List from "@mui/material/List";
import { TodoContext } from "../Main/Todo";
import Chip from "@mui/material/Chip";
import Transition from "../Misc/Transition";

export default function SummaryModal() {
  const { summaryOpen, todos } = useContext(TodoContext);

  const totalTodos = todos.length;
  const doneTodos = todos.filter((todo) => todo.done === true);
  const doneTodoNo = doneTodos.length;

  return (
    <>
      <Dialog
        // className="flex items-center justify-center bg-blue-100 text-blue-30"
        open={summaryOpen}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="summary-modal"
        // Lowest zIndex
        style={{ zIndex: 500 }}
      >
        <DialogTitle className="flex items-center text-4xl bg-blue-300 text-blue-50 justify-evenly">
          Summary view!
          <img
            className="w-32 pl-10"
            src="src/styles/dodone_design.svg"
            alt="DoDone Logo"
          />
        </DialogTitle>
        <DialogContent className="bg-blue-50 text-blue-50 ">
          <DialogTitle className="text-center text-blue-500">
            <div> PROGRESS CIRCLE:</div>
          </DialogTitle>

          <div className="flex items-center justify-center mt-3 mb-2 ">
            {/* PROGRESS CIRCLE */}
            <ProgressCircle totalTodos={totalTodos} doneTodos={doneTodoNo} />
            <div className="flex flex-col justify-evenly">
              <Chip
                sx={{
                  padding: "12px",
                  marginBottom: "1.25rem",
                  marginLeft: "2rem",
                }}
                label="DONE"
                color="primary"
              />
              <Chip
                sx={{
                  padding: "12px",

                  marginLeft: "2rem",
                }}
                label="UN-DONE "
                color="secondary"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            {/* TODOS DONE */}
            <List
              sx={{
                width: "100%",
                maxWidth: 580,
                backgroundColor: "rgb(147 197 253)",
                marginTop: "3vh",
                marginBottom: "5vh",
                borderRadius: "10px",
              }}
            >
              <DialogTitle>
                {!doneTodoNo ? "GET TO WORK MAN!" : "Tasks done: "}
              </DialogTitle>
              {doneTodos.map((todo) => {
                // TODO: GET RID OF {...TODO} // DONT SPREAD OBJECTS LIKE THAT
                return <TodoItem todo={todo} {...todo} key={todo.id} />;
              })}
            </List>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
