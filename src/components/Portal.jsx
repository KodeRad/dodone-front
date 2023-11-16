import { createPortal } from "react-dom";

export const Portal = ({ children, wrapperId }) => {
  return createPortal(children, document.getElementById(wrapperId));
};
