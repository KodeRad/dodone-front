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
import { TodoContext, FormContext } from "../Main/Todo";
import CheckboxComponent from "../Misc/Checkbox";
import Transition from "../Misc/Transition";

export default function NewTodoForm({ addTodo }) {
  const { newTodoOpen, setNewTodoOpen, priority, setPriority } =
    useContext(FormContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    // defaultValues: { todoPriority: false },
  });

  const handleClose = () => {
    setNewTodoOpen(false);
  };

  const onTimeChange = (selectedTime) => {
    setValue("time", selectedTime); // Use the received value in register
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
        <DialogContent className="text-blue-500 bg-blue-100">
          <form
            className="mt-3"
            onSubmit={handleSubmit((data) => {
              addTodo(data.todoName, data.todoPriority, data.time);
              handleClose();

              // Cleares input fields
              reset();
            })}
          >
            <input
              className="pl-2 mr-2 bg-blue-200 rounded-md"
              {...register("todoName", { required: true })}
              id="newTodoName"
              placeholder="Todo's name"
            />

            <Checkbox
              {...register("todoPriority")}
              sx={{
                color: "rgb(59 130 246)",
                "&.Mui-checked": {
                  color: "rgb(59 130 246)",
                },
              }}
              value={priority}
              onChange={(e) => {
                setPriority(e.target.checked);
              }}
              icon={<StarBorder />}
              checkedIcon={<Star />}
            />

            {/* // TODO: NEWTODOFORM HAS WRONG DATE, PRIORITY SET TO FALSE */}
            <DatePicker {...register("time")} onTimeChange={onTimeChange} />

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
