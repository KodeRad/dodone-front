import { forwardRef, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CalendarList from "./CalendarList";
import { TodoContext } from "./Todo";
import styles from "./../layout/calendar.css";

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
        <DialogTitle className="bg-blue-300 text-blue-50">
          {"El Calendarrro!"}
        </DialogTitle>
        <DialogContent className="bg-blue-100 text-blue-500">
          <CalendarList styles={{ styles }} />
        </DialogContent>
      </Dialog>
    </>
  );
}
