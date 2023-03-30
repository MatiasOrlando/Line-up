import { useFormik } from "formik";
import validationUserData from "./validation/validationUserData";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FormUserData() {
const [user, setUser] = useState() 
const { data } = useSession()
 if(data && data.user && data.user.email && !user){
      axios.get(`http://localhost:3001/api/user/email/${data.user.email}`).then((res) => setUser(res.data))   
  }



  const [status, setStatus] = useState(true)


const formik = useFormik({
    initialValues: {
       password: "",
       phone: user?.phone || null,
    },
    onSubmit: async (data) => {
const {password, phone} = data
      const id = user._id
    const response = await axios.put(`http://localhost:3001/api/user/${id}`, {password, phone})
    },
      validationSchema: validationUserData.validationSchema,  
  });


  return (
    <div className="container-form-userdata">
      <div className="container-form-userdata__first-div">
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
              value={user?.name}
            />
            <div className="box-span"></div>
          </div>
          <div className="login-form_box-input">
            <label htmlFor="pass">Mail</label>
            <input
              disabled={true}
              className={`input-primary width-100 `}
              type="text"
              id="pass"
              onChange={formik.handleChange}
              value={user?.email}
            />
          </div>

          <div className="div-split-two">
            <div className="div-inter-50-left">

            <label htmlFor="pass">DNI</label>
            <input
            disabled={true}
              className={`input-primary width-100`}
              type="text"
              id="pass"
              onChange={formik.handleChange}
              value={user?.dni}
            />
          </div>
          <div className="div-inter-50-right">
            <label htmlFor="pass">Telefono</label>
            <input
              disabled={user?.phone? (true) : (false)}
              className={`input-primary width-100  ${formik.touched.phone && formik.errors.phone ? "error-input" : ""}`}
              type="number"
              id="phone"
              onChange={formik.handleChange}
              value={user?.phone}
            />
          </div>
          </div>
          

          <div className="login-form_box-input">
            <label htmlFor="pass">Contraseña</label>
            <input
              className={`input-primary width-100 ${
                formik.touched.password && formik.errors.password ? "error-input" : ""
              }`}
              type="password"
              id="password"
              onChange={formik.handleChange}
               placeholder={"Ingrese su nueva contraseña"} 
              disabled={status}
               value={formik.values.password} 
              />
              <span>{formik.errors.password}</span>
          </div>
          <div className="login-form_box-pass">
            <button type="button" onClick={() => {setStatus(!status)}} className="btn-tertiary">Editar contraseña</button>
          </div>
          <div>
            <button
              className="btn-primary width-100"
              type="submit"
            >
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
