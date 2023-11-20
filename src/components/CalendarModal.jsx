import { forwardRef, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CalendarList from "./CalendarList";
import { TodoContext } from "./Todo";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CalendarModal() {
  const { calendarOpen } = useContext(TodoContext);

  return (
    <>
      <Dialog
        open={calendarOpen}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="calendar-modal"
      >
        <DialogTitle>{"El Calendarrro!"}</DialogTitle>
        <DialogContent>
          <CalendarList />
        </DialogContent>
      </Dialog>
    </>
  );
}
