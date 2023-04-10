import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { BsCheckSquare } from "react-icons/bs";
import Modal from "@/commons/Modal";
import validationNewBranch from "./validation/validationNewBranch";
import { useRouter } from "next/router";

export default function FormNewBranch() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      closingHour: "",
      openingHour: "",
      allowedClients: "",
    },

    onSubmit: async (dat) => {
      console.log(dat);
      const { name, location, closingHour, openingHour, allowedClients } = dat;
      const response = await axios.post(
        `http://localhost:3001/api/admin/create-branch/token?token=${data.user}`,
        { name, location, closingHour, openingHour, allowedClients }
      );
      console.log(response);
      setModalIsOpen(true);
    },
    validationSchema: validationNewBranch.validationSchema,
  });

  return (
    <>
      <div className="container-form-userdata">
        <div className="container-form-userdata-first-div">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
            className="login-form"
          >
            <div className="login-form_box-title">
              <h2>Crear una nueva sucursal</h2>
            </div>
            <div className="login-form_box-input">
              <label htmlFor="name">Nombre</label>
              <input
                className={`input-primary width-100 ${
                  formik.touched.name && formik.errors.name ? "error-input" : ""
                }`}
                type="text"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <div className="box-span"></div>
            </div>
            <div className="login-form_box-input">
              <label htmlFor="location">Ubicacion</label>
              <input
                className={`input-primary width-100 ${
                  formik.touched.location && formik.errors.location
                    ? "error-input"
                    : ""
                }`}
                type="text"
                id="location"
                onChange={formik.handleChange}
                value={formik.values.location}
              />
            </div>
            <div className="div-split-two">
              <div className="div-inter-50-left">
                <label htmlFor="openingHour">Horario de incio</label>
                <input
                  className={`input-primary width-100 ${
                    formik.touched.openingHour && formik.errors.openingHour
                      ? "error-input"
                      : ""
                  }`}
                  type="text"
                  id="openingHour"
                  onChange={formik.handleChange}
                  value={formik.values.openingHour}
                />
              </div>
              <div className="div-inter-50-right">
                <label htmlFor="closingHour">Horario de cierre</label>
                <input
                  className={`input-primary width-100  ${
                    formik.touched.closingHour && formik.errors.closingHour
                      ? "error-input"
                      : ""
                  }`}
                  type="text"
                  id="closingHour"
                  onChange={formik.handleChange}
                  value={formik.values.closingHour}
                />
              </div>
            </div>
            <div className="login-form_box-input">
              <label htmlFor="allowedClients">Capacidad maxima</label>
              <input
                className={`input-primary width-100 ${
                  formik.touched.allowedClients && formik.errors.allowedClients
                    ? "error-input"
                    : ""
                }`}
                type="number"
                id="allowedClients"
                onChange={formik.handleChange}
                value={formik.values.allowedClients}
              />
            </div>
            <div>
              <button className="btn-primary width-100" type="submit">
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        redirect={{ function: router.push, rute: "/crearOperador" }}
        modalContent={{
          title: "Sucursal creada correctamente",
          description:
            "Ya podes crear un operador y designarlo a esta sucursal",
          button: "Aceptar",
          icon: <BsCheckSquare className="icon" />,
        }}
      ></Modal>
    </>
  );
}
