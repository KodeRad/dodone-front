import { forwardRef, useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import DatePicker from "./DatePicker";
import { StarBorder, Star } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { TodoContext } from "./Todo";
import CheckboxComponent from "./Checkbox";
import dayjs from "dayjs";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditTodoForm() {
  const {
    editTodoOpen,
    setEditTodoOpen,
    patchTodo,
    editedId,
    editedName,
    deleteTodo,
    editedPriority,
    time,
    setTime,
    setEditedName,
    setEditedPriority,
  } = useContext(TodoContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

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
      <DialogTitle>{"Edit todo!"}</DialogTitle>
      <DialogContent style={{ zIndex: 3000 }}>
        <form
          onSubmit={handleSubmit((data) => {
            patchTodo(
              editedId,
              editedName,
              editedPriority,
              dayjs(time).format("YYYY-MM-DD HH:mm:ss")
            );
          })}
        >
          {/* register your input into the hook by invoking the "register" function */}

          <input
            {...register("todoName", { required: true })}
            value={editedName}
            onChange={(e) => {
              setEditedName(e.target.value);
            }}
          />

          {/* include validation with required or other standard HTML validation rules */}
          {/* // TODO: EXTRACT IT TO THE SEPARATE COMPONENT (USED ALSO IN NewTodoForm) */}
          {/* ONCLICK = CHANGE STATE, UDPATE STATE BY FETCH ??? */}
          {/*  // REFACTOR: AT FIRST RENDER MY STATE IS EMPTY FOR CHANGING THE PRIORITY OF THE TASK */}
          <Checkbox
            checked={editedPriority}
            onClick={() => {
              setEditedPriority(!editedPriority);
            }}
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

          {/* @react-refresh:160 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? Check the render method of `NewTodoForm`. */}
          {/* <CheckboxComponent
            checked={editedPriority}
            {...register("todoPriority")}
            icon={<StarBorder />}
            checkedIcon={<Star />}
          /> */}

          {/* <Checkbox
            value={editedPriority}
            onClick={() => {
              setEditedPriority(!editedPriority);
            }}
            // checked={editedPriority}
            {...register("todoPriority")}
            sx={{
              color: "rgb(59 130 246)",
              "&.Mui-checked": {
                color: "rgb(59 130 246)",
              },
            }}
            icon={<StarBorder />}
            checkedIcon={<Star />}
          /> */}

          {/* TODO: SHOW THE TIME FOR THE TODO THAT YOU CLICK */}
          <DatePicker style={{ zIndex: 4000 }} time={time} setTime={setTime} />

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
    </Dialog>,
    document.getElementById("portal")
  );
}
