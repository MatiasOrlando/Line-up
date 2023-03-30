import { useFormik } from "formik";
import validationUserData from "./validation/validationUserData";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FormUserData() {
 const [user, setUser] = useState() 

const { data } = useSession()



 if(data){
  if(data.user){
    if(data.user.email){
    
        axios.get(`http://localhost:3001/api/user/email/${data.user.email}`).then((res) => setUser(res.data))
      
      }
  }
} 
console.log(user)




 




  const formik = useFormik({
    initialValues: {
       password: "",
    },
    onSubmit: async (data) => {
      console.log(data)
      const { password } = data;
      try {
        if(user.id){
         const result = await axios.put(`http://localhost:3001/api/user/${user.id}`, {
          password
        });
        console.log(result)
        }
      } catch (err) {
        console.log(err);
      }
    },
    validationSchema: validationUserData.validationSchema,
  });

  return (

    <div className="container-form-userdata">
      
       <div className="container-form-userdata__first-div">
        <form onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()

        }} className="login-form">
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
              value={user?.name}
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
              value={user?.email}
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
              value={user?.dni}
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
              value={user?.phone}
            />
          </div></div>
          
         
          <div className="login-form_box-input">
            <label htmlFor="pass">Contrasenia</label>
            <input
              className={`input-primary width-100 ${
                formik.touched.pass && formik.errors.pass ? "error-input" : ""
              }`}
              type="password"
              id="pass"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <div className="login-form_box-pass">
            <button className="btn-tertiary">Editar Contrasenia</button>
          </div>
          <div>
            <button
              className="btn-primary width-100"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
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
