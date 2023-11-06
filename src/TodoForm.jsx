// TODO: CHECK WHAT FORWARDREF DOES
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TodoForm({ newTodoOpen, setNewTodoOpen }) {
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
        <DialogTitle>{"Add new Todo"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
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
