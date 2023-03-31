import Modal from "@/commons/Modal";
import React, { useState } from "react";
import { BsCheckSquare } from "react-icons/bs";
import axios from "axios";

const ForgetPassword = ({ setForgetPassword }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const handlePassword = () => {
    setForgetPassword(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setForgetPassword(false);
  };

  const handleEmailPasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const passwordUpdate = await axios.post(
        "http://localhost:3001/api/user/password-update",
        {
          email,
        }
      );
      passwordUpdate && setIsOpen(true);
    } catch {
      setIsOpen(false);
      setIsValidEmail(false);
    }
  };

  return (
    <>
      <div className="container-form-login">
        <div className="container-form-login__first-div">
          <form className="login-form" onSubmit={handleEmailPasswordUpdate}>
            <div className="login-form_box-title">
              <h2>¿Olvidaste tu contraseña?</h2>
            </div>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <p style={{ textAlign: "center" }}>
                Ingresa tu correo electrónico y te enviaremos los pasos a seguir
                para recuperar tu cuenta.
              </p>
            </div>
            <div className="login-form_box-input">
              <label>Mail</label>
              <input
                style={{ marginBottom: "20px" }}
                className={`input-primary width-100`}
                type="text"
                id="user"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value === "") {
                    setIsValidEmail(true);
                  }
                }}
              />
              <div className="box-span"></div>
            </div>
            <div className="credentials-box">
              <span>
                {!isValidEmail ? `El email ingresado no es válido` : ``}
              </span>
            </div>
            <div>
              <button className="btn-primary width-100" type="submit">
                Enviar correo electronico
              </button>
            </div>
            <hr />
            <div>
              <button
                className="btn-secondary width-100"
                type="button"
                onClick={handlePassword}
              >
                Volver al inicio de sesion
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div className="center width-100">
          <BsCheckSquare className="icon" />
          <h2>Mail enviado correctamente</h2>
          <p>Mira en tu casilla de correo para recuperar la contraseña</p>
          <button className="btn-primary width-100" onClick={handleCloseModal}>
            Aceptar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ForgetPassword;
