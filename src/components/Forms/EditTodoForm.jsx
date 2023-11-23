import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Transition from "../Misc/Transition";
import { FormContext } from "../Main/Todo";
import Dialog from "@mui/material/Dialog";
import { createPortal } from "react-dom";
import { useContext } from "react";
import Form from "./Form";

export default function EditTodoForm({ deleteTodo, patchTodo }) {
  const { editTodoOpen, setEditTodoOpen } = useContext(FormContext);

  const handleClose = () => {
    setEditTodoOpen(false);
  };

  return createPortal(
    <Dialog
      style={{ zIndex: 1000 }}
      open={editTodoOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className="bg-blue-300 text-blue-50">
        {"Edit todo!"}
      </DialogTitle>
      <DialogContent
        className="text-blue-500 bg-blue-100 "
        style={{ zIndex: 3000 }}
      >
        <Form
          handleClose={handleClose}
          deleteTodo={deleteTodo}
          patchTodo={patchTodo}
        />
      </DialogContent>
    </Dialog>,
    document.getElementById("portal")
  );
}
