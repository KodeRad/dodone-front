import { forwardRef } from "react";
import Slide from "@mui/material/Slide";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import dodonelogo from "./../../styles/dodone_logo.svg";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Transition from "../Misc/Transition";

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
        className="items-center justify-center block text-4xl bg-blue-100 rounded-lg text-blue-30"
        // TODO: zIndex ? // CSS: STYLE TO BLUE
        open={loginOpen}
        fullScreen
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="login-modal"
      >
        <DialogTitle className="flex items-center justify-center p-4 text-4xl bg-blue-200 text-blue-50 h-2/6">
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
            {/* TODO: DECLARE ARRAY WITH VALUES AND MAP IT OVER IN HERE */}
            <input
              className="p-2 mb-4 text-center bg-blue-100 rounded-lg w-72 "
              // sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-2/5
              // className="flex items-center justify-center"
              {...register("Username", { required: true })}
              id="username"
              placeholder="Username"
            />
            <input
              className="p-2 mb-4 text-center bg-blue-100 rounded-lg w-72"
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
