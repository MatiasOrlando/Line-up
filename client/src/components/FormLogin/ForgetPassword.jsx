import Modal from "@/commons/Modal";
import React, { useState } from "react";
import { BsCheckSquare } from "react-icons/bs";
import axios from "axios";

const ForgetPassword = ({ setForgetPassword }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handlePassword = () => {
    setForgetPassword(false);
  };

  const handleEmailPasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const passwordUpdate = await axios.put(
        "http://localhost:3001/api/user/password-update-email",
        {
          email,
        }
      );
      passwordUpdate && setModalIsOpen(true);
    } catch {
      setIsValidEmail(false);
    }
  };

  return (
    <>
      <div className="container-form-login">
        <div className="container-form-login-first-div">
          <form className="login-form" onSubmit={handleEmailPasswordUpdate}>
            <div
              className="login-form_box-title"
              style={{ marginBottom: "10px" }}
            >
              <h2>¿Olvidaste tu contraseña?</h2>
            </div>
            <hr></hr>
            <div style={{ marginTop: "10px", marginBottom: "20px" }}>
              <p style={{ textAlign: "center" }}>
                Ingresa tu correo electrónico y te enviaremos los pasos a seguir
                para recuperar tu cuenta.
              </p>
            </div>
            <div className="login-form_box-input">
              <label>Correo electrónico</label>
              <input
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
                {!isValidEmail ? `El correo ingresado no es válido` : ``}
              </span>
            </div>
            <div>
              <button className="btn-primary width-100" type="submit">
                Enviar correo electrónico
              </button>
            </div>
            <hr />
            <div>
              <button
                className="btn-secondary width-100"
                type="button"
                onClick={handlePassword}
              >
                Volver al inicio de sesión
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        redirect={{ function: setForgetPassword, rute: false }}
        modalContent={{
          title: "Mail enviado correctamente",
          description:
            "Mira en tu casilla de correo para recuperar la contraseña",
          button: "Aceptar",
          icon: <BsCheckSquare className="icon" />,
        }}
      ></Modal>
    </>
  );
};

export default ForgetPassword;
