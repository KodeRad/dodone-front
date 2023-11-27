import { createPortal } from "react-dom";
import React from "react";

export const Portal = ({ children, wrapperId }) => {
  return createPortal(children, document.getElementById(wrapperId));
};
