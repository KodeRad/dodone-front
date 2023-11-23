import React, { useContext, useEffect, useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DatePicker from "./DatePicker";
import { StarBorder, Star } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { FormContext } from "../Main/Todo";
import { useForm } from "react-hook-form";

const Form = ({ handleClose, deleteTodo, patchTodo }) => {
  const { editedId, editedName, editedPriority, setEditedPriority, time } =
    useContext(FormContext);

  const [initialTime, setInitialTime] = useState("");

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
          // I want to use the selected Time if I don't change time
          // initialTime
          // dayjs(selectedTime).format("YYYY-MM-DD HH:mm:ss")
          dayjs(time).format("YYYY-MM-DD HH:mm:ss")
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
        setInitialTime={setInitialTime}
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
