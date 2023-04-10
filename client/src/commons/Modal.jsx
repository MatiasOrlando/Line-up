const Modal = ({ modalIsOpen, setModalIsOpen, redirect, modalContent }) => {
  const handleCloseModal = () => {
    setModalIsOpen(false);
    if (redirect) {
      redirect.function(redirect.rute);
    }
  };

  if (!modalIsOpen) return null;
  return (
    <div className="container-modal ">
      <div className="modal-content">
        <div className="center width-100">
          {modalContent.icon}
          <h2>{modalContent.title}</h2>
          <p>{modalContent.description}</p>
          <button className="btn-primary width-100" onClick={handleCloseModal}>
            {modalContent.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
