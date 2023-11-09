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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditTodoForm({
  editTodoOpen,
  setEditNewTodoOpen,
  patchTodo,
  editedId,
}) {
  const [time, setTime] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => handleClose;

  const handleClose = () => {
    setEditNewTodoOpen(false);
  };

  return (
    <>
      <Dialog
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
            })}
          >
            {/* register your input into the hook by invoking the "register" function */}
            <input
              {...register("todoName", { required: true })}
              placeholder="Todo's name"
            />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("todoPriority")} placeholder="priority" />
            <DatePicker time={time} setTime={setTime} />

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
