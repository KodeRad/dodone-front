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
  const { calendarOpen, setCalendarOpen } = useContext(TodoContext);
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
        // TODO: GET ONE NAMING CONVENTIONS FOR PASSING PROPS AND HELPER FUNCTIONS
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"El Calendarrro!"}</DialogTitle>
        <DialogContent>
          <CalendarList />
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
