import { useFormik } from "formik";
import validationUserData from "./validation/validationUserData";
import { signIn, signOut } from "next-auth/react";

export default function FormUserData() {
  const formik = useFormik({
    initialValues: {
      name: "pepito",
      email: "pepito@gmail.com",
      dni: 43422342,
      phone: 4242242424,
      password: "",
    },
    onSubmit: (data) => {
      console.log(data);
      formik.handleReset();
    },
    validationSchema: validationUserData.validationSchema,
  });

  return (
    <div className="container-form-userdata">
       <div className="container-form-userdata__first-div">
        <form className="login-form">
          <div className="login-form_box-title">
            <h2>Mis datos</h2>
          </div>
          <div className="login-form_box-input">
            <label htmlFor="user">Nombre</label>
            <input
              disabled={true}
              className={`input-primary width-100 ${
                formik.touched.user && formik.errors.user ? "error-input" : ""
              }`}
              type="text"
              id="user"
              onChange={formik.handleChange}
              value={formik.initialValues.name}
            />
            <div className="box-span"></div>
          </div>
          <div className="login-form_box-input">
            <label htmlFor="pass">Mail</label>
            <input
            disabled={true}
              className={`input-primary width-100 ${
                formik.touched.pass && formik.errors.pass ? "error-input" : ""
              }`}
              type="text"
              id="pass"
              onChange={formik.handleChange}
              value={formik.initialValues.email}
            />
          </div>

          
          <div className="div-split-two">
            <div className="div-inter-50-left">
            <label htmlFor="pass">DNI</label>
            <input
            disabled={true}
              className={`input-primary width-100 ${
                formik.touched.pass && formik.errors.pass ? "error-input" : ""
              }`}
              type="text"
              id="pass"
              onChange={formik.handleChange}
              value={formik.initialValues.dni}
            />
          </div>
          <div className="div-inter-50-right">
            <label htmlFor="pass">Telefono</label>
            <input
            disabled={true}
              className={`input-primary width-100 ${
                formik.touched.pass && formik.errors.pass ? "error-input" : ""
              }`}
              type="text"
              id="pass"
              onChange={formik.handleChange}
              value={formik.initialValues.phone}
            />
          </div></div>
          
         
          <div className="login-form_box-input">
            <label htmlFor="pass">Contrasenia</label>
            <input
              className={`input-primary width-100 ${
                formik.touched.pass && formik.errors.pass ? "error-input" : ""
              }`}
              type="text"
              id="pass"
              onChange={formik.handleChange}
              value={formik.initialValues.password}
            />
          </div>
          <div className="login-form_box-pass">
            <button className="btn-tertiary">Editar Contrasenia</button>
          </div>
          <div>
            <button
              className="btn-primary width-100"
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
              Aceptar
            </button>
          </div>
        </form>
      </div> 
    </div>
  );
}
