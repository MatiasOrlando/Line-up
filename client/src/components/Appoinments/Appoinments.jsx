import { useEffect, useState } from "react";
import axios from "axios";

export default function Appoinments() {
  const [appoinments, setAppoinments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          "http://localhost:3001/api/appointments/123"
        );

        setAppoinments(result.data.slice(0, 15));
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);
  return (
    <main className="container-appointments">
      <div className="container-appointments_box">
        <div className="box-title">
          <h2>Reservas</h2>
        </div>
        <div className="container-list">
          {appoinments.map((app) => {
            return (
              <div className="item-list" key={app._id}>
                <div className="item-section">
                  <div className="item-title">Nombre y Apellido</div>
                  <div className="item-description">{app.user.name}</div>
                </div>
                <div className="item-section">
                  <div className="item-title">Reserva</div>
                  <div className="item-description">
                    {app.date}-{app.timeOfAppontment}
                  </div>
                </div>
                <div className="item-section">
                  <div className="item-title">Sucursal</div>
                  <div className="item-description">
                    {app.sucursal.location}
                  </div>
                </div>
                <div className="item-section">
                  <div className="item-title">N° de la reserva</div>
                  <div className="item-description">{app.user.id}</div>
                </div>
                <div className="item-section">
                  <select className="btn-secondary" name="" id="">
                    <option className="btn-secondary" value="none">
                      Editar
                    </option>
                    <option className="btn-secondary" value="none">
                      Ejemplo1
                    </option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
