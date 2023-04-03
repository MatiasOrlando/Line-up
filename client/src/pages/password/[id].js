import Modal from "../../commons/Modal";
import { useState } from "react";
import { BsCheckSquare } from "react-icons/bs";
import { useRouter } from "next/router";
import axios from "axios";
import { useFormik } from "formik";
import validationPassword from "../../components/FormLogin/validation/validationPassword";

const createPassword = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    onSubmit: async (data) => {
      try {
        await axios.put(`http://localhost:3001/api/user/${id}`, {
          password: data.password,
        });
        setModalIsOpen(true);
      } catch (error) {
        console.error(error);
      }
    },
    validationSchema: validationPassword.validationSchema,
  });

  return (
    <>
      <div className="container-form-login">
        <div className="container-form-login__first-div">
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <div className="login-form_box-title">
              <h2>Ingresa tu nueva contraseña</h2>
            </div>
            <hr></hr>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ textAlign: "center" }}>
                Recorda que la nueva contraseña debe contener una mayúscula, una
                minúscula, un numero y un minimo de 8 caracteres.
              </p>
            </div>
            <div className="login-form_box-input">
              <label>Contraseña</label>
              <input
                style={{ marginBottom: "20px" }}
                className={`input-primary width-100 ${
                  formik.touched.password && formik.errors.password
                    ? "error-input"
                    : ""
                }`}
                type="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              <div className="box-span"></div>
            </div>
            <div className="login-form_box-input">
              <label>Repetir Contraseña</label>
              <input
                style={{ marginBottom: "20px" }}
                className={`input-primary width-100 ${
                  formik.touched.repeatPassword && formik.errors.repeatPassword
                    ? "error-input"
                    : ""
                }`}
                type="password"
                id="repeatPassword"
                onChange={formik.handleChange}
                value={formik.values.repeatPassword}
              />
              <div className="box-span"></div>
            </div>
            <div>
              <button className="btn-primary width-100" type="submit">
                Cambiar contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        redirect={{ function: router.push, rute: "/" }}
        modalContent={{
          title: "Contraseña actualizada",
          description: "Iniciá sesion para continuar",
          button: "Aceptar",
          icon: <BsCheckSquare className="icon" />,
        }}
      ></Modal>
    </>
  );
};

export default createPassword;
