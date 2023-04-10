import * as Yup from "yup";

const validationLogin = {
  validationSchema: Yup.object({
    password: Yup.string()
      .required("")
      .test("has-lowercase", (value) => {
        return /[a-z]/.test(value);
      })
      .test("has-uppercase", "mayúscula", (value) => {
        return /[A-Z]/.test(value);
      })
      .test(
        "has-number",
        "La contraseña debe tener al menos un número",
        (value) => {
          return /\d/.test(value);
        }
      )
      .test(
        "min-length",
        "La contraseña debe tener al menos 8 caracteres",
        (value) => {
          return value.length >= 8;
        }
      )
      .test(
        "no-spaces",
        "La contraseña no puede contener espacios",
        (value) => value && !/\s/.test(value)
      ),
    repeatPassword: Yup.string()
      .required("Es requerido")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
  }),
};

export default validationLogin;
