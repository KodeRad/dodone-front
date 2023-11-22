// REFACTOR: NEWTODOFORM AND EDITTODOFORM CAN BE ONE?

import { forwardRef, useContext, useState } from "react";
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
import { TodoContext } from "./Todo";
import CheckboxComponent from "./Checkbox";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewTodoForm({ addTodo }) {
  const { newTodoOpen, setNewTodoOpen, time, priority, setPriority } =
    useContext(TodoContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // defaultValues: { todoPriority: false },
  });

  const handleClose = () => {
    setNewTodoOpen(false);
  };

  return (
    <>
      <Dialog
        open={newTodoOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="new-todo-form-modal"
      >
        <DialogTitle className="bg-blue-300 text-blue-50">
          {"New Todo!"}
        </DialogTitle>
        <DialogContent className="bg-blue-100 text-blue-500">
          <form
            className="mt-3"
            onSubmit={handleSubmit((data) => {
              addTodo(data.todoName, data.todoPriority, time);
              handleClose();

              // Cleares input fields
              reset();
            })}
          >
            <input
              className="bg-blue-200 rounded-md pl-2 mr-2"
              {...register("todoName", { required: true })}
              id="newTodoName"
              placeholder="Todo's name"
            />

            {/* // TODO: VALIDATION */}
            {/* include validation with required or other standard HTML validation rules */}
            {/* // TODO: PRIORITY SET TO DISPLAY TO FALSE WHEN IT'S FALSE */}
            <Checkbox
              {...register("todoPriority")}
              sx={{
                color: "rgb(59 130 246)",
                "&.Mui-checked": {
                  color: "rgb(59 130 246)",
                },
              }}
              // value={priority}
              // onChange={(e) => {
              //   // console.log(e.target.checked);
              //   setPriority(e.target.checked);
              // }}
              icon={<StarBorder />}
              checkedIcon={<Star />}
            />

            {/* @react-refresh:160 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? Check the render method of `NewTodoForm`. */}
            {/* <CheckboxComponent
              {...register("todoPriority")}
              icon={<StarBorder />}
              checkedIcon={<Star />}
            /> */}

            {/* // TODO: NEWTODOFORM HAS WRONG DATE, PRIORITY SET TO FALSE */}
            <DatePicker />

            {/* // TODO: SET ERRORS AND DISPLAY THEM ON UI */}
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <DialogActions
              sx={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
