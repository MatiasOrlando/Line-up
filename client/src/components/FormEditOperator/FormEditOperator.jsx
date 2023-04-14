import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { BsCheckSquare } from "react-icons/bs";
import Modal from "@/commons/Modal";
import { useRouter } from "next/router";
import validationNewOperator from "../FormNewOperator/validation/validation.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormEditOperator({ user, branchName, idLocation }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);
  const { data } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      password: user.password,
      dni: user.dni,
      location: branchName,
      repeatPassword: user.password,
    },

    onSubmit: async (dat) => {
      const { name, email, password, dni, location } = dat;
      try {
        const response = await axios.put(
          `http://localhost:3001/api/admin/edit-one-operator/${user._id}/token?token=${data.user}`,
          {
            name,
            email,
            password,
            dni,
            location,
            idLocation: idLocation,
          }
        );
        setModalIsOpen(true);
      } catch (err) {
        const message = err.response.data.message;
        if (message.includes("email")) {
          setError("error-input-email");
        } else if (message.includes("dni")) {
          setError("error-input-dni");
        } else {
          setError("error-input-location");
        }
        if (err) {
          setTimeout(() => {
            setError("");
          }, 2000);
        }
      }
    },
    validationSchema: validationNewOperator.validationSchema,
  });
  console.error(error);
  const togglePasswordVisibility = (password) => {
    password === "password"
      ? setPasswordShown(!passwordShown)
      : setRepeatPasswordShown(!repeatPasswordShown);
  };

  return (
    <>
      <div className="container-form-userdata">
        <div className="container-form-userdata-first-div">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className="login-form"
            style={{ marginTop: "5px" }}
          >
            <div className="login-form_box-title">
              {router.pathname.includes("/editar") ? (
                <h2>Editar operador</h2>
              ) : (
                <h2>Crear una nuevo operador</h2>
              )}
            </div>
            <div className="login-form_box-input">
              <label htmlFor="name" style={{ marginTop: "5px" }}>
                Nombre
              </label>
              <input
                className={`input-primary width-100 ${
                  formik.touched.name && formik.errors.name ? "error-input" : ""
                }`}
                type="text"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <div className="box-span"></div>
            </div>
            <div className="login-form_box-input">
              <label htmlFor="email">Correo electrónico</label>
              <input
                className={`input-primary width-100 ${
                  formik.touched.email && formik.errors.email
                    ? "error-input"
                    : ""
                }`}
                type="text"
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
            <div className="div-split-two">
              <div className="div-inter-50-left">
                <label htmlFor="dni">DNI</label>
                <input
                  className={`input-primary width-100 ${
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
              <div className="div-inter-50-right">
                <label htmlFor="location">Sucursal</label>
                <input
                  disabled
                  className={`input-primary width-100 ${
                    formik.touched.location && formik.errors.location
                      ? "error-input"
                      : ""
                  }`}
                  type="text"
                  id="location"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                />
                <div className="email-error">
                  {error === "error-input-location" ? (
                    <span className="email-span">
                      Esta sucursal no se encuentra registrada
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className="div-split-two">
              <div className="div-inter-50-left">
                <label htmlFor="pass" className="password-label">
                  Contraseña
                  <button
                    type="button"
                    style={{ top: "55%" }}
                    onClick={(e) => {
                      e.preventDefault();
                      togglePasswordVisibility("password");
                    }}
                  >
                    {repeatPasswordShown ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <input
                    className={`input-primary width-100 ${
                      formik.touched.password && formik.errors.password
                        ? "error-input"
                        : ""
                    }`}
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    onChange={formik.handleChange}
                    placeholder={"Ingrese su nueva contraseña"}
                    value={formik.values.password || ""}
                  />
                </label>
                <span>{formik.errors.password}</span>
              </div>

              <div className="div-inter-50-right">
                <label htmlFor="pass" className="password-label">
                  Repetir Contraseña
                  <button
                    type="button"
                    style={{ top: "55%" }}
                    onClick={(e) => {
                      e.preventDefault();
                      togglePasswordVisibility("repeatPassword");
                    }}
                  >
                    {repeatPasswordShown ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <input
                    className={`input-primary width-100 ${
                      formik.touched.password && formik.errors.password
                        ? "error-input"
                        : ""
                    }`}
                    type={repeatPasswordShown ? "text" : "password"}
                    id="repeatPassword"
                    onChange={formik.handleChange}
                    placeholder={"Ingrese su nueva contraseña"}
                    value={formik.values.repeatPassword || ""}
                  />
                </label>
                <span>{formik.errors.repeatPassword}</span>
              </div>
            </div>
            <div>
              <button
                className="btn-primary width-100"
                type="submit"
                style={{ marginTop: "10px" }}
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        redirect={{ function: router.push, rute: "/operadores/1" }}
        modalContent={{
          title: "Operador editado con éxito",
          description: "El operador puede iniciar sesión con normalidad",
          button: "Aceptar",
          icon: <BsCheckSquare className="icon" />,
        }}
      ></Modal>
    </>
  );
}
