import * as Yup from "yup";

const validationRegister = {
  validationSchema: Yup.object({
    name: Yup.string().required(),
    dni: Yup.number().required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
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
      ),
    repeatPassword: Yup.string()
      .required("Es requerido")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
  }),
};

export default validationRegister;
