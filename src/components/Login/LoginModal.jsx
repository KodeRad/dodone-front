import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import dodonelogo from "./../../styles/dodone_logo.svg";
import DialogTitle from "@mui/material/DialogTitle";
import Transition from "../Misc/Transition";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

export default function LoginModal({ setLoginOpen, loginOpen }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});

  const handleClose = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <Dialog
        className="items-center justify-center block text-4xl bg-blue-100 rounded-lg text-blue-30"
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
          <form
            className="flex flex-col items-center mt-12"
            onSubmit={handleSubmit((data) => {
              handleClose();
              reset();
            })}
          >
            <input
              className="p-2 mb-4 text-center bg-blue-100 rounded-lg w-72 "
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
