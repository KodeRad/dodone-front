import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Star, StarBorder } from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import { FormContext } from "../Main/Todo";
import Transition from "../Misc/Transition";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Checkbox } from "@mui/material";
import DatePicker from "./DatePicker";
import { useContext } from "react";

export default function NewTodoForm({ addTodo }) {
  const { newTodoOpen, setNewTodoOpen } = useContext(FormContext);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({});

  const handleClose = () => {
    setNewTodoOpen(false);
  };

  const onTimeChange = (selectedTime) => {
    setValue("time", selectedTime);
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
              icon={<StarBorder />}
              checkedIcon={<Star />}
            />

            <DatePicker {...register("time")} onTimeChange={onTimeChange} />

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
