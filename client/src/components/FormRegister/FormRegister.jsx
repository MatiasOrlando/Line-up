import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import validationRegister from "./validation/validationregister";
import { useRef } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsCheckSquare } from "react-icons/bs";
import { MdCancelPresentation } from "react-icons/md";

export default function FormRegister() {
  const input = useRef(null);
  const router = useRouter();
  const [mayuscula, setMayuscula] = useState({
    oracion: "ABC tiene una mayuscula",
    color: "black",
  });
  const [minuscula, setMinuscula] = useState({
    oracion: "ABC tiene una minuscula",
    color: "black",
  });
  const [numero, setNumero] = useState({
    oracion: "123 tiene un Numero",
    color: "black",
  });
  const [caracteres, setCaracteres] = useState({
    oracion: "*** Minimo 8 caracteres",
    color: "black",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      dni: "",
      mail: "",
      password: "",
      repeatPassword: "",
    },
    onSubmit: async (data) => {
      router.push("/");
      try {
        await axios.post("http://localhost:3000/api/users/register", { data });
      } catch (err) {
        console.log(err);
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
    <>
      <div className="register">
        <Link href="/" className="a">
          <AiOutlineArrowLeft /> Atras
        </Link>
        <form
          className="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
            handlePassword(input.current.value);
          }}
        >
          {console.log("ERROR", formik.errors)}
          <div>
            <h1>Crear cuenta</h1>
          </div>
          <div className="flex margin">
            <div className="input-margin">
              <label htmlFor="nombre">Nombre</label>
              <input
                className={`input-primary senary ${
                  formik.touched.name && formik.errors.name ? "error-input" : ""
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
            </div>
          </div>
          <div className="email margin">
            <label htmlFor="email">Mail</label>
            <input
              className={`input-primary ten ${
                formik.touched.mail && formik.errors.mail ? "error-input" : ""
              }`}
              type="mail"
              id="mail"
              onChange={formik.handleChange}
              value={formik.values.mail}
            />
          </div>
          <div className="flex margin">
            <div className="input-margin">
              <label htmlFor="password">Contraseña</label>
              <input
                ref={input}
                className={`input-primary senary ${
                  formik.touched.password && formik.errors.password
                    ? "error-input"
                    : ""
                }`}
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <label htmlFor="repeatPassword">Repetir Contraseña</label>
              <input
                className={`input-primary senary ${
                  formik.touched.repeatPassword && formik.errors.repeatPassword
                    ? "error-input"
                    : ""
                }`}
                type="password"
                id="repeatPassword"
                onChange={formik.handleChange}
                value={formik.values.repeatPassword}
              />
            </div>
          </div>
          <div className="fondo">
            <h5>La contraseña debe tener</h5>
            <hr className="err"></hr>
            <div className="flex">
              <span
                className="box-span marginRight"
                style={{ color: mayuscula.color }}
              >
                {mayuscula.color === "black" ? (
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
                {minuscula.color === "black" ? (
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
                {numero.color === "black" ? (
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
                {caracteres.color === "black" ? (
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
                Ya tienes cuenta? inicia sesion
              </button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
