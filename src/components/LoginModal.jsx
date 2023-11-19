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

export default function LoginModal() {
  const { loginOpen, setLoginOpen } = useContext(TodoContext);

  const handleClose = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <Dialog
        // TODO: zIndex ?
        // CSS: STYLE TO BLUE
        open={loginOpen}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"LOGIN TO DODONE"}</DialogTitle>
        <DialogContent>
          {/* // CONTENT: FORM */}
          <DialogActions>
            <Button onClick={handleClose}>Login</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
