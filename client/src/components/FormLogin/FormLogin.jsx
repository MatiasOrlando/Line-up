import { useFormik } from "formik";
import validationLogin from "./validation/validationLogin";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function FormLogin() {
  const formik = useFormik({
    initialValues: {
      user: "",
      pass: "",
    },
    onSubmit: (data) => {
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
              className={`input-primary width-100 ${
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
              className={`input-primary width-100 ${
                formik.touched.pass && formik.errors.pass ? "error-input" : ""
              }`}
              type="password"
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
              className="btn-primary width-100"
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                formik.handleSubmit();
                await signIn("credentials", {
                  redirect: true,
                  email: formik.values.user,
                  password: formik.values.pass,
                  callbackUrl: "/reserva",
                });
              }}
            >
              Ingresar
            </button>
          </div>
          <hr />
          <div>
            <Link href={"/registro"}>
              <button className="btn-secondary width-100" type="button">
                ¿No tenes cuenta? Registrate
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
