import { useFormik } from "formik";
import validationLogin from "./validation/validationLogin";
import { signIn, getSession, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ForgetPassword from "./ForgetPassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import googleIcon from "../../assets/google.png";

export default function FormLogin({ secret }) {
  const [forgetPassword, setForgetPassword] = useState(false);
  const [credentials, setCredentials] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    await signIn("google", {
      prompt: "select_account",
      redirect: true,
      callbackUrl: "/reserva",
    });
  };

  const formik = useFormik({
    initialValues: {
      user: "",
      pass: "",
    },
    onSubmit: async () => {
      formik.handleReset();
      const signInRes = await signIn("credentials", {
        secret: secret || "",
        email: formik.values.user,
        password: formik.values.pass,
        redirect: false,
      });
      const { ok, error } = signInRes;
      if (ok) {
        const session = await getSession();
        if (session && session.role) {
          if (session.role.admin) {
            router.push("/sucursales/1");
          } else if (session.role.operator) {
            router.push("/operadorReservas/1");
          } else {
            router.push("/reserva");
          }
        }
      } else {
        setCredentials("Credenciales invalidas");
        setTimeout(() => {
          setCredentials("");
        }, 2000);
      }
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
            <label htmlFor="user">Correo electrónico</label>
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
            <div
              style={{
                paddingTop: "20px",
                display: "flex",
              }}
            >
              <button
                className="btn-primary width-100"
                onClick={(e) => {
                  handleGoogleSignIn(e);
                }}
              >
                <div style={{ marginBottom: "4px" }}>
                  Continuar con Google
                  <Image
                    style={{
                      height: "13px",
                      width: "22px",
                      marginLeft: "5px",
                      marginTop: "7px",
                    }}
                    src={googleIcon}
                    alt="google logo"
                  />
                </div>
              </button>
            </div>
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
