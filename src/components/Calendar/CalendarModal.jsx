import { useContext } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CalendarList from "./CalendarList";
import { TodoContext } from "../Main/Todo";
import styles from "./calendar.css";
import Transition from "../Misc/Transition";

export default function CalendarModal() {
  const { calendarOpen } = useContext(TodoContext);

  return (
    <Dialog
      open={calendarOpen}
      fullScreen
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="calendar-modal"
    >
      <DialogTitle className="flex items-center justify-center bg-blue-300 text-blue-50 h-1/8">
        Calendar view!
        <img
          className="w-32 pl-10"
          src="src/styles/dodone_design.svg"
          alt="DoDone Logo"
        />
      </DialogTitle>
      {/* TODO: GET RID OF THOSE DIVS */}
      <div className="bg-blue-300 text-blue-50"></div>
      <div className="bg-blue-300 text-blue-50"></div>
      <DialogContent className="mb-10 text-blue-500 bg-blue-100">
        <CalendarList styles={{ styles }} />
      </DialogContent>
    </Dialog>
  );
}
