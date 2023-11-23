import React, { useContext } from "react";
import DialogActions from "@mui/material/DialogActions";
import DatePicker from "./DatePicker";
import { StarBorder, Star } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
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
      <input
        className="pl-2 mr-12 bg-blue-200 rounded-md"
        {...register("todoName", { required: true })}
        value={editedName}
        onChange={(e) => {
          setEditedName(e.target.value);
        }}
      />

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
