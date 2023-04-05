import { useFormik } from "formik";
import validationLogin from "./validation/validationLogin";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function FormLogin() {
  const [forgetPassword, setForgetPassword] = useState(false);
  const [credentials, setCredentials] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      user: "",
      pass: "",
    },
    onSubmit: async () => {
      formik.handleReset();
      await signIn("credentials", {
        email: formik.values.user,
        password: formik.values.pass,
        redirect: false,
      }).then(({ ok, error }) => {
        if (ok) {
          router.push("/reserva");
        } else {
          setCredentials("Credenciales invalidas");
          setTimeout(() => {
            setCredentials("");
          }, 2000);
        }
      });
    },
    validationSchema: validationLogin.validationSchema,
  });

  const handleEditPassword = () => {
    setForgetPassword(true);
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  if (forgetPassword) {
    return <ForgetPassword setForgetPassword={setForgetPassword} />;
  }

  return (
    <div className="container-form-login">
      <div className="container-form-login-first-div">
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
          <div
            className="login-form_box-input
           password-label"
          >
            <label htmlFor="pass">
              Contraseña
              <button
                type="button"
                style={{ top: "55%" }}
                onClick={() => togglePasswordVisibility()}
              >
                {passwordShown ? <FaEye /> : <FaEyeSlash />}
              </button>
              <input
                className={`input-primary width-100 ${
                  formik.touched.pass && formik.errors.pass ? "error-input" : ""
                }`}
                type={passwordShown ? "text" : "password"}
                id="pass"
                onChange={formik.handleChange}
                value={formik.values.pass}
              />
            </label>
          </div>
          <div className="credentials-box">
            <span>{credentials}</span>
          </div>
          <div className="login-form_box-pass">
            <button
              className="btn-tertiary"
              type="button"
              onClick={handleEditPassword}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <div>
            <button
              className="btn-primary width-100"
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              Ingresar
            </button>
          </div>
          <hr />
          <div>
            <Link href={"/registro"}>
              <button className="btn-secondary width-100" type="button">
                ¿No tenés cuenta? Registrate
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
