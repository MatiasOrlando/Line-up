import Modal from "../../commons/Modal";
import { useState } from "react";
import { BsCheckSquare } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";

const createPassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const { token } = router.query;
  const handleCloseModal = () => {
    setIsOpen(false);
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (token) {
        const res = await axios.put(
          `http://localhost:3001/api/user/new-password-email`,
          {
            password: newPassword,
            token,
          }
        );
        setIsOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container-form-login">
        <div className="container-form-login__first-div">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form_box-title">
              <h2>Ingresa tu nueva contraseña</h2>
            </div>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}></div>
            <div className="login-form_box-input">
              <label>Contraseña</label>
              <input
                style={{ marginBottom: "20px" }}
                className={`input-primary width-100`}
                type="password"
                id="user"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <div className="box-span"></div>
            </div>
            <div>
              <button className="btn-primary width-100" type="submit">
                Confirmar nueva contraseña
              </button>
            </div>
            <hr />
          </form>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div className="center width-100">
          <BsCheckSquare className="icon" />
          <p>Contraseña actualizada satisfactoriamente</p>
          <button className="btn-primary width-100" onClick={handleCloseModal}>
            Aceptar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default createPassword;
