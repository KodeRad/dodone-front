import React, { useContext } from "react";
import DialogActions from "@mui/material/DialogActions";
import DatePicker from "./DatePicker";
import { StarBorder, Star } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import CheckboxComponent from "../Misc/Checkbox";
import dayjs from "dayjs";
import { FormContext } from "../Main/Todo";
import { useForm } from "react-hook-form";

const Form = ({ handleClose, deleteTodo, patchTodo }) => {
  const {
    editedId,
    editedName,
    editedPriority,
    time,
    setTime,
    setEditedName,
    setEditedPriority,
  } = useContext(FormContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
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
        className="pl-2 mr-12 bg-blue-200 rounded-md"
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

      <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {/* //TODO: ADD POP OUT WINDOW TO CONFIRM DELETING  */}
        <Button
          sx={{ color: "rgb(248 113 113)" }}
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
  );
};

export default Form;
