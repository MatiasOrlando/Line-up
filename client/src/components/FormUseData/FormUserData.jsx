import { useFormik } from "formik";
import validationUserData from "./validation/validationUserData";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BsCheckSquare } from "react-icons/bs";
import Modal from "@/commons/Modal";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormUserData() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);
  const [user, setUser] = useState();
  const [status, setStatus] = useState(true);
  const { data } = useSession();
  const userToken = data;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (data && data?.user) {
          const tokenUser = await axios.get(
            `http://localhost:3001/api/user/validate/token?token=${data.user}`
          );
          if (tokenUser) {
            setUser(tokenUser.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [data]);
  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
      phone: user?.phone || null,
    },

    onSubmit: async (data) => {
      const { password } = data;
      const response = await axios.put(
        `http://localhost:3001/api/user/new-password`,
        {
          password,
          token: userToken.user,
        }
      );
      setModalIsOpen(true);
      formik.values.password = "";
      formik.values.repeatPassword = "";
      setStatus(true);
    },
    validationSchema: validationUserData.validationSchema,
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
          >
            <div className="login-form_box-title">
              <h2>Mis datos</h2>
            </div>
            <div className="login-form_box-input">
              <label htmlFor="user">Nombre</label>
              <input
                disabled={true}
                className={`input-primary width-100 `}
                type="text"
                id="user"
                onChange={formik.handleChange}
                value={user?.name || ""}
              />
              <div className="box-span"></div>
            </div>
            <div className="login-form_box-input">
              <label htmlFor="pass">Correo electrónico</label>
              <input
                disabled={true}
                className={`input-primary width-100 `}
                type="text"
                id="pass"
                onChange={formik.handleChange}
                value={user?.email || ""}
              />
            </div>
            {user && user.admin ? (
              <div className="login-form_box-input">
                <label htmlFor="pass">DNI</label>
                <input
                  disabled={true}
                  className={`input-primary width-100`}
                  type="text"
                  id="pass"
                  onChange={formik.handleChange}
                  value={user?.dni || ""}
                />
              </div>
            ) : (
              <div className="div-split-two">
                <div className="div-inter-50-left">
                  <label htmlFor="pass">DNI</label>
                  <input
                    disabled={true}
                    className={`input-primary width-100`}
                    type="text"
                    id="pass"
                    onChange={formik.handleChange}
                    value={user?.dni || ""}
                  />
                </div>
                <div className="div-inter-50-right">
                  <label htmlFor="pass">Telefono</label>
                  <input
                    disabled={user?.phone ? true : false}
                    className={`input-primary width-100  ${
                      formik.touched.phone && formik.errors.phone
                        ? "error-input"
                        : ""
                    }`}
                    type="number"
                    id="phone"
                    onChange={formik.handleChange}
                    value={user?.phone || ""}
                  />
                </div>
              </div>
            )}
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
                    disabled={status}
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
                    disabled={status}
                    value={formik.values.repeatPassword || ""}
                  />
                </label>
                <span>{formik.errors.repeatPassword}</span>
              </div>
            </div>
            <div className="login-form_box-pass">
              <button
                type="button"
                onClick={() => {
                  setStatus(!status);
                }}
                className="btn-tertiary"
              >
                Editar contraseña
              </button>
            </div>
            <div>
              <button className="btn-primary width-100" type="submit">
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        modalContent={{
          title: "Contraseña actualizada correctamente",
          description:
            "A partir de ahora iniciá sesión con tu nueva contraseña",
          button: "Aceptar",
          icon: <BsCheckSquare className="icon" />,
        }}
      ></Modal>
    </>
  );
}
