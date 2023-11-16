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
import { Checkbox } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TodoForm({ newTodoOpen, setNewTodoOpen, addTodo }) {
  const [time, setTime] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // const onSubmit = () => handleClose;

  const handleClose = () => {
    setNewTodoOpen(false);
  };

  return (
    <>
      <Dialog
        open={newTodoOpen}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"New Todo!"}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit((data) => {
              // onSubmit(data);
              handleClose();
              addTodo(data.todoName, data.todoPriority, time);
              // TODO: CLEAR THE INPUT FIELDS
              reset();
            })}
          >
            {/* register your input into the hook by invoking the "register" function */}
            <input
              {...register("todoName", { required: true })}
              placeholder="Todo's name"
            />

            {/* include validation with required or other standard HTML validation rules */}
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
