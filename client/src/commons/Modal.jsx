import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="container-modal ">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
