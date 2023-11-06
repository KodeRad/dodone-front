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
import { DemoItem } from "@mui/x-date-pickers/internals/demo";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TodoForm({ newTodoOpen, setNewTodoOpen, addTodo }) {
  const [time, setTime] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = () => handleClose;

  const handleClose = () => {
    setNewTodoOpen(false);
  };

  return (
    <>
      <Dialog
        open={newTodoOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"New Todo!"}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit((data) => {
              onSubmit(data);
              addTodo(data.todoName, data.todoPriority, time);
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

// import { useState } from "react";

// export default function TodoForm({ addTodo }) {
//   const [newItem, setNewItem] = useState("");

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (newItem === "") return;

//     addTodo(newItem);

//     setNewItem("");
//   }

//   return (
//     <form onSubmit={handleSubmit} className="new-item-form">
//       <div className="form-row">
//         <label htmlFor="item">New Item</label>
//         <input
//           value={newItem}
//           onChange={(e) => setNewItem(e.target.value)}
//           type="text"
//           id="item"
//         />
//       </div>
//       <button className="btn">Add</button>
//     </form>
//   );
// }
