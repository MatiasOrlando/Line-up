import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import validationRegister from "./validation/validationregister";
import { useRef } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsCheckSquare } from "react-icons/bs";
import { MdCancelPresentation } from "react-icons/md";
import Modal from "@/commons/Modal";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormRegister() {
  const router = useRouter();
  const input = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);
  const [error, setError] = useState("");
  const [mayuscula, setMayuscula] = useState({
    oracion: "ABC tiene una mayúscula",
    color: "$septenaryGrey",
  });
  const [minuscula, setMinuscula] = useState({
    oracion: "ABC tiene una minúscula",
    color: "$septenaryGrey",
  });
  const [numero, setNumero] = useState({
    oracion: "123 tiene un Número",
    color: "$septenaryGrey",
  });
  const [caracteres, setCaracteres] = useState({
    oracion: "*** Minimo 8 caracteres",
    color: "$septenaryGrey",
  });

  const togglePasswordVisibility = (password) => {
    password === "password"
      ? setPasswordShown(!passwordShown)
      : setRepeatPasswordShown(!repeatPasswordShown);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      dni: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: async (data) => {
      const { name, dni, email, password } = data;
      try {
        await axios.post("http://localhost:3001/api/user/register", {
          dni,
          name,
          email,
          password,
        });
        setModalIsOpen(true);
      } catch (err) {
        if (err.response.data.includes("email")) {
          setError("error-input-email");
        } else if (err.response.data.includes("dni")) {
          setError("error-input-dni");
        }
        if (err) {
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      }
    },
    validationSchema: validationRegister.validationSchema,
  });

  const handlePassword = (data) => {
    const min = /[a-z]/;
    const may = /[A-Z]/;
    const num = /\d/;
    if (may.test(data)) {
      setMayuscula({ ...mayuscula, color: "green" });
    } else {
      setMayuscula({ ...mayuscula, color: "red" });
    }
    if (min.test(data)) {
      setMinuscula({ ...minuscula, color: "green" });
    } else {
      setMinuscula({ ...minuscula, color: "red" });
    }
    if (num.test(data)) {
      setNumero({ ...numero, color: "green" });
    } else {
      setNumero({ ...numero, color: "red" });
    }
    if (data.length >= 8) {
      setCaracteres({ ...caracteres, color: "green" });
    } else {
      setCaracteres({ ...caracteres, color: "red" });
    }
  };
  return (
    <div>
      <div className="container-form-register">
        <div className="register">
          <form
            className="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
              handlePassword(input.current.value);
            }}
          >
            <Link href="/" className="a">
              <AiOutlineArrowLeft className="icon" /> Atrás
            </Link>
            <div>
              <h1>Crear cuenta</h1>
            </div>
            <div className="flex margin">
              <div className="input-margin">
                <label htmlFor="nombre">Nombre y Apellido</label>
                <input
                  className={`input-primary senary ${
                    formik.touched.name && formik.errors.name
                      ? "error-input"
                      : ""
                  }`}
                  type="text"
                  id="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
              </div>
              <div>
                <label htmlFor="nombre">DNI</label>
                <input
                  className={`input-primary senary ${
                    formik.touched.dni && formik.errors.dni ? "error-input" : ""
                  }`}
                  type="number"
                  id="dni"
                  onChange={formik.handleChange}
                  value={formik.values.dni}
                />
                <div className="email-error">
                  {error === "error-input-dni" ? (
                    <span className="email-span">
                      Este dni ya se encuentra en uso
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="email margin">
              <label htmlFor="email">Correo electrónico</label>
              <input
                className={`input-primary ten ${error} ${
                  formik.touched.email && formik.errors.email
                    ? "error-input"
                    : ""
                }`}
                type="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <div className="email-error">
                {error === "error-input-email" ? (
                  <span className="email-span">
                    Este correo ya se encuentra en uso
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="flex margin">
              <div className="input-margin">
                <label htmlFor="password" className="password-label">
                  Contraseña
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      togglePasswordVisibility("password");
                    }}
                  >
                    {passwordShown ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <input
                    ref={input}
                    className={`input-primary senary ${
                      formik.touched.password && formik.errors.password
                        ? "error-input"
                        : ""
                    }`}
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="repeatPassword" className="password-label">
                  Repetir Contraseña
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      togglePasswordVisibility("repeatPassword");
                    }}
                  >
                    {repeatPasswordShown ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <input
                    className={`input-primary senary ${
                      formik.touched.repeatPassword &&
                      formik.errors.repeatPassword
                        ? "error-input"
                        : ""
                    }`}
                    type={repeatPasswordShown ? "text" : "password"}
                    id="repeatPassword"
                    onChange={formik.handleChange}
                    value={formik.values.repeatPassword}
                  />
                </label>
              </div>
            </div>
            <div className="validations">
              <h5>La contraseña debe contener:</h5>
              <hr></hr>
              <div className="flex">
                <span
                  className="box-span marginRight"
                  style={{ color: mayuscula.color }}
                >
                  {mayuscula.color === "$septenaryGrey" ? (
                    mayuscula.oracion
                  ) : (
                    <>
                      {mayuscula.color === "red" ? (
                        <MdCancelPresentation className="iconMargin" />
                      ) : (
                        <BsCheckSquare className="iconMargin" />
                      )}
                      {mayuscula.oracion}
                    </>
                  )}
                </span>
                <span className="box-span" style={{ color: minuscula.color }}>
                  {minuscula.color === "$septenaryGrey" ? (
                    minuscula.oracion
                  ) : (
                    <>
                      {minuscula.color === "red" ? (
                        <MdCancelPresentation className="iconMargin" />
                      ) : (
                        <BsCheckSquare className="iconMargin" />
                      )}
                      {minuscula.oracion}
                    </>
                  )}
                </span>
              </div>
              <div className="flex">
                <span
                  className="box-span marginRight"
                  style={{ color: numero.color }}
                >
                  {numero.color === "$septenaryGrey" ? (
                    numero.oracion
                  ) : (
                    <>
                      {numero.color === "red" ? (
                        <MdCancelPresentation className="iconMargin" />
                      ) : (
                        <BsCheckSquare className="iconMargin" />
                      )}
                      {numero.oracion}
                    </>
                  )}
                </span>

                <span className="box-span" style={{ color: caracteres.color }}>
                  {caracteres.color === "$septenaryGrey" ? (
                    caracteres.oracion
                  ) : (
                    <>
                      {caracteres.color === "red" ? (
                        <MdCancelPresentation className="iconMargin" />
                      ) : (
                        <BsCheckSquare className="iconMargin" />
                      )}
                      {caracteres.oracion}
                    </>
                  )}
                </span>
              </div>
            </div>
            <div className="margin">
              <button type="submit" className="btn-primary ten">
                Registrarme
              </button>
            </div>
            <hr></hr>
            <div className="link">
              <Link href="/">
                <button className="btn-secondary ten">
                  ¿Ya tenés cuenta? Iniciá sesión
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Modal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          redirect={{ function: router.push, rute: "/" }}
          modalContent={{
            title: "Usuario creado correctamente",
            description:
              "Recuerda activar tu cuenta desde tu correo para iniciar sesión",
            button: "Aceptar",
            icon: <BsCheckSquare className="icon" />,
          }}
        ></Modal>
      </div>
    </div>
  );
}
