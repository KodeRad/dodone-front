import React, { useContext, useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import { StarBorder, Star } from "@mui/icons-material";
import { FormContext } from "../Main/Todo";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Checkbox } from "@mui/material";
import DatePicker from "./DatePicker";
import dayjs from "dayjs";

const Form = ({ handleClose, deleteTodo, patchTodo }) => {
  const { editedId, editedName, editedPriority, setEditedPriority } =
    useContext(FormContext);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("todoName", editedName);
  }, [editedName]);

  const onTimeChange = (selectedTime) => {
    setValue("time", dayjs(selectedTime).format("YYYY-MM-DD HH:mm:ss"));
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        patchTodo(
          editedId,
          data.todoName,
          editedPriority,
          dayjs(data.time).format("YYYY-MM-DD HH:mm:ss")
        );
      })}
    >
      <input
        className="pl-2 mr-12 bg-blue-200 rounded-md"
        {...register("todoName", { required: true })}
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

      <DatePicker
        {...register("time")}
        onTimeChange={onTimeChange}
        style={{ zIndex: 4000 }}
      />

      {errors.exampleRequired && <span>This field is required</span>}

      <DialogActions sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
