import { useFormik } from "formik";
import validationLogin from "./validation/validationLogin";
import { signIn, signOut } from "next-auth/react";

export default function FormLogin() {
  const formik = useFormik({
    initialValues: {
      user: "",
      pass: "",
    },
    onSubmit: (data) => {
      console.log(data);
      formik.handleReset();
    },
    validationSchema: validationLogin.validationSchema,
  });

  return (
    <div className="container-form-login">
      <div className="container-form-login__first-div">
        <form className="login-form">
          <div className="login-form_box-title">
            <h2>Iniciar sesión</h2>
          </div>
          <div className="login-form_box-input">
            <label htmlFor="user">Usuario</label>
            <input
              className={`input-primary ten ${
                formik.touched.user && formik.errors.user ? "error-input" : ""
              }`}
              type="text"
              id="user"
              onChange={formik.handleChange}
              value={formik.values.user}
            />
            <div className="box-span"></div>
          </div>
          <div className="login-form_box-input">
            <label htmlFor="pass">Contraseña</label>
            <input
              className={`input-primary ten ${
                formik.touched.pass && formik.errors.pass ? "error-input" : ""
              }`}
              type="text"
              id="pass"
              onChange={formik.handleChange}
              value={formik.values.pass}
            />
          </div>
          <div className="login-form_box-pass">
            <button className="btn-tertiary">¿Olvidaste tu contraseña?</button>
          </div>
          <div>
            <button
              className="btn-primary ten"
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                formik.handleSubmit();
                await signIn("credentials", {
                  redirect: false,
                  email: formik.values.user,
                  password: formik.values.pass,
                });
              }}
            >
              Ingresar
            </button>
          </div>
          <hr />
          <div>
            <button className="btn-secondary ten" type="button">
              ¿No tenes cuenta? Registrate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
