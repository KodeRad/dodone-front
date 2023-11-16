// TODO: CHECK WHAT FORWARDREF DOES
import { forwardRef, useState } from "react";
import { createPortal } from "react-dom";
import { Portal } from "./Portal";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DatePicker from "./DatePicker";
import zIndex from "@mui/material/styles/zIndex";
import { StarBorder, Star } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditTodoForm({
  editTodoOpen,
  setEditNewTodoOpen,
  patchTodo,
  editedId,
  editedName,
  deleteTodo,
}) {
  const [time, setTime] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = () => handleClose;

  const handleClose = () => {
    setEditNewTodoOpen(false);
  };

  return createPortal(
    <>
      <Dialog
        sx={{ zIndex: "tooltip" }}
        // closeOnSelect={true}
        open={editTodoOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit todo!"}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              // IF THERE ARE NO INPUTS, OR SHOULD I MAKE THOSE FILEDS POPULATED BY THE PREVIOUS VALUES?
              // I need to pass ID, but from where? (202)
              patchTodo(editedId, data.todoName, data.todoPriority, time);
              reset();
            })}
          >
            {/* register your input into the hook by invoking the "register" function */}

            {/* TODO: ADD A TODOS NAME IN EDIT FORM */}
            <input
              {...register("todoName", { required: true })}
              // getById and take a name from it
              placeholder={editedName}
            />

            {/* include validation with required or other standard HTML validation rules */}
            {/* // TODO: EXTRACT IT TO THE SEPARATE COMPONENT (USED ALSO IN TodoForm) */}
            <Checkbox
              // checked={priority}
              {...register("todoPriority")}
              sx={{
                color: "rgb(59 130 246)",
                "&.Mui-checked": {
                  color: "rgb(59 130 246)",
                },
              }}
              icon={<StarBorder />}
              checkedIcon={<Star />}
            />

            <DatePicker setTime={setTime} />

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <DialogActions>
              <Button
                onClick={() => {
                  deleteTodo(editedId);
                  handleClose();
                }}
              >
                Delete
              </Button>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={handleClose}>
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>,
    document.getElementById("portal")
  );
}
