import Modal from "@/commons/Modal";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsCheckSquare } from "react-icons/bs";

const FormCancel = ({ user, token, idApp }) => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, isChecked: false, text: "Ya no quiero ir" },
    { id: 2, isChecked: false, text: "Encontré un lugar mejor" },
    { id: 3, isChecked: false, text: "Me equivoqué de horario" },
    { id: 4, isChecked: false, text: "Me cancelaron" },
    { id: 5, isChecked: false, text: "Otro" },
  ]);

  const handleCheckboxChange = (id) => {
    const newCheckboxes = checkboxes.map((checkbox) => {
      if (checkbox.id === id) {
        return { ...checkbox, isChecked: !checkbox.isChecked };
      } else if (checkbox.isChecked) {
        return { ...checkbox, isChecked: false };
      } else {
        return checkbox;
      }
    });
    setCheckboxes(newCheckboxes);
  };

  const handleCancel = async (cancelReason) => {
    const cancel = await axios.put(
      `http://localhost:3001/api/appointments/cancel/${idApp}/token?token=${token.user}`,
      { cancelReason }
    );
    setModalIsOpen(true);
  };
  return (
    <>
      <div className="container-reason">
        <div className="hi-name">Hola {user.name}</div>
        <div className="explanation-cancel">
          ¿Por qué desea cancelar su reserva?
        </div>
      </div>
      <div style={{ marginBottom: "50px" }}>
        {checkboxes.map((checkbox) => {
          return (
            <div key={checkbox.id}>
              <hr className="line-hr" />
              <div className="no-show">
                <input
                  type="checkbox"
                  checked={checkbox.isChecked}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                  className="checkbox-noshow"
                />
                <p style={checkbox.isChecked ? { fontWeight: "bolder" } : {}}>
                  {checkbox.text}
                </p>
              </div>
              {checkbox.isChecked && (
                <div className="container-cancel">
                  <p className="p-cancel">Su reserva actual será cancelada</p>
                  <p className="p-cancel">
                    La cancelación no puede ser revertida
                  </p>
                  <button
                    className="btn-primary"
                    style={{ backgroundColor: "#E53939" }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCancel(checkbox.text);
                    }}
                  >
                    <span className="button-cancel-text">
                      Confirmar cancelación
                    </span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        redirect={{ function: router.push, rute: "/reservas/1" }}
        modalContent={{
          title: "Turno cancelado con éxito",
          description: "Muchas gracias por no confiar en nosotros",
          button: "Aceptar",
          icon: <BsCheckSquare className="icon" />,
        }}
      ></Modal>
    </>
  );
};

export default FormCancel;
