import { useState } from "react";

const FormCancel = () => {
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

  return (
    <>
      <div className="container-reason">
        <div className="hi-name">Hola Ivan</div>
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
                <p>{checkbox.text}</p>
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
    </>
  );
};

export default FormCancel;
