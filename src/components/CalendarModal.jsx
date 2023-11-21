import { forwardRef, useContext } from "react";
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
        <DialogTitle className="bg-blue-300 text-blue-50 flex justify-center items-center h-1/8">
          Calendar view!
          <img
            className="w-32 pl-10"
            src="src/layout/dodone_design.svg"
            alt="DoDone Logo"
          />
        </DialogTitle>
        <div className="bg-blue-300 text-blue-50"></div>
        <div className="bg-blue-300 text-blue-50"></div>
        <DialogContent className="bg-blue-100 text-blue-500 mb-10">
          {/* calendarList styles which don't work */}
          <CalendarList styles={{ styles }} />
        </DialogContent>
      </Dialog>
    </>
  );
}
