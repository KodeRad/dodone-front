// TODO: CHECK WHAT FORWARDREF DOES
import { forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DatePicker from "./DatePicker";
import CalendarList from "./CalendarList";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CalendarModal({
  calendarOpen,
  setCalendarOpen,
  todos,
}) {
  const handleClose = () => {
    setCalendarOpen(false);
  };

  return (
    <>
      <Dialog
        open={calendarOpen}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"El Calendarrro!"}</DialogTitle>
        <DialogContent>
          <CalendarList todos={todos} />
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}