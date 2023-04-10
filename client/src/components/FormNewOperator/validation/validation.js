import * as Yup from "yup";

const validationNewOperator = {
  validationSchema: Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    dni: Yup.number().required(),
    location: Yup.string().required(),
    password: Yup.string()
      .required("")
      .test("has-lowercase", "ABC tiene una minúscula", (value) => {
        return /[a-z]/.test(value);
      })
      .test("has-uppercase", "ABC tiene una mayúscula", (value) => {
        return /[A-Z]/.test(value);
      })
      .test("has-number", "123 tiene un Número", (value) => {
        return /\d/.test(value);
      })
      .test("min-length", "*** Minimo 8 caracteres", (value) => {
        return value.length >= 8;
      })
      .test(
        "no-spaces",
        "La contraseña no puede contener espacios",
        (value) => value && !/\s/.test(value)
      ),
    repeatPassword: Yup.string()
      .required("")
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir"),
  }),
};

export default validationNewOperator;
