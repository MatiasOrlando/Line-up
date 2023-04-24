import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { BsCheckSquare } from "react-icons/bs";
import Modal from "@/commons/Modal";
import { useRouter } from "next/router";
import validationNewOperator from "./validation/validation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormNewOperator({ branches }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);
  const { data } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      dni: "",
      location: "Seleciona un valor",
      repeatPassword: "",
    },

    onSubmit: async (dat) => {
      if (dat.location !== "Seleciona un valor") {
        const { name, email, password, dni, location } = dat;
        try {
          await axios.post(
            `http://localhost:3001/api/admin/create-operator/token?token=${data.user}`,
            {
              name,
              email,
              password,
              dni,
              location,
              phone: 111608,
              operator: true,
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
      } else {
        setError("error-input-location");
      }
    },
    validationSchema: validationNewOperator.validationSchema,
  });

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
              <h2>Crear una nuevo operador</h2>
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
                <select
                  className={`input-primary width-100 ${
                    formik.touched.location && formik.errors.location
                      ? "error-input"
                      : ""
                  }`}
                  type="text"
                  id="location"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                >
                  <option value={"Seleciona un valor"}>
                    Seleciona un valor
                  </option>
                  {branches.map((branch) => {
                    return (
                      <option value={branch.name} key={branch.id}>
                        {branch.name}
                      </option>
                    );
                  })}
                </select>
                <div className="email-error">
                  {error === "error-input-location" ? (
                    <span className="email-span">
                      Debe seleccionar una sucursal
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
        redirect={{ function: router.push, rute: "/sucursales/1" }}
        modalContent={{
          title: "Operador creado correctamente",
          description: "El operador ya puede iniciar sesión con su cuenta",
          button: "Aceptar",
          icon: <BsCheckSquare className="icon" />,
        }}
      ></Modal>
    </>
  );
}
