// TODO: CHECK WHAT FORWARDREF DOES
import { forwardRef, useContext } from "react";
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

export default function NewTodoForm() {
  const { newTodoOpen, setNewTodoOpen, addTodo, time, setTime } =
    useContext(TodoContext);
  // const [time, setTime] = useState(dayjs(new Date()));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    setNewTodoOpen(false);
  };

  return (
    <>
      <Dialog
        open={newTodoOpen}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"New Todo!"}</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit((data) => {
              addTodo(data.todoName, data.todoPriority, time);
              handleClose();

              // Cleares input fields
              reset();
            })}
          >
            <input
              {...register("todoName", { required: true })}
              placeholder="Todo's name"
            />

            {/* // TODO: VALIDATION */}
            {/* include validation with required or other standard HTML validation rules */}
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

            {/* @react-refresh:160 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? Check the render method of `NewTodoForm`. */}
            {/* <CheckboxComponent
              {...register("todoPriority")}
              icon={<StarBorder />}
              checkedIcon={<Star />}
            /> */}

            <DatePicker />

            {/* // TODO: SET ERRORS AND DISPLAY THEM ON UI */}
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
