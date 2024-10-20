import React from "react";
import ReactDOM from "react-dom";

export default function Backdrop({ children, closeModal }) {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={closeModal}>
      {children}
    </div>,
    document.getElementById("portal")
  );
}
