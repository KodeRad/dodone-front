import { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useForm } from "react-hook-form";
import dodonelogo from "./../../styles/dodone_logo.svg";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginModal({ setLoginOpen, loginOpen }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // defaultValues: { todoPriority: false },
  });

  const handleClose = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <Dialog
        className="bg-blue-100 text-blue-30 rounded-lg text-4xl block justify-center items-center"
        // TODO: zIndex ? // CSS: STYLE TO BLUE
        open={loginOpen}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="login-modal"
      >
        <DialogTitle className="bg-blue-200 text-blue-50 p-4 text-4xl flex justify-center items-center h-2/6">
          <img src={dodonelogo} alt="DoDone Logo" />
        </DialogTitle>
        <DialogContent className="bg-blue-200">
          {/* // CONTENT: FORM */}
          <form
            className="flex flex-col items-center mt-12"
            onSubmit={handleSubmit((data) => {
              handleClose();
              // Cleares input fields
              reset();
            })}
          >
            <input
              className="rounded-lg text-center bg-blue-100 mb-4 p-2 w-72 "
              // sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/5
              // className="flex justify-center items-center"
              {...register("Username", { required: true })}
              id="username"
              placeholder="Username"
            />
            <input
              className="rounded-lg text-center bg-blue-100 mb-4 p-2 w-72"
              {...register("Password", { required: true })}
              id="password"
              type="password"
              placeholder="Password"
            />
            {/* // TODO: SET ERRORS AND DISPLAY THEM ON UI */}
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
            <DialogActions>
              <Button variant="contained" type="submit">
                Login
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
