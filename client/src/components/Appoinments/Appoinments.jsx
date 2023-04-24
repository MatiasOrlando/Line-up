import { useRouter } from "next/router";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Appoinments({ branches, length }) {
  const router = useRouter();
  const [valor, setValor] = useState();

  const handleChange = (event, value) => {
    router.push(`/reservas/${value}`);
  };

  return (
    <>
      <main className="container-appointments">
        <div className="container-appointments_box">
          <div className="box-title">
            <h2>Reservas</h2>
          </div>
          <div className="container-list">
            {branches.map((app) => {
              return (
                <div className="item-list" key={app._id}>
                  <div className="item-section">
                    <div className="item-title">Nombre y Apellido</div>
                    <div className="item-description">{app.user.name}</div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">Reserva</div>
                    <div className="item-description">
                      {app.date} {app.timeOfAppoinment}
                    </div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">Sucursal</div>
                    <div className="item-description">{app.sucursal.name}</div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">N° de la reserva</div>
                    <div className="item-description">{app.idApp}</div>
                  </div>
                  <div className="item-section">
                    {app.status === "Cancel" ? (
                      <button className="btn-secondary" disabled>
                        Cancelado
                      </button>
                    ) : app.status === "completed" ? (
                      <button className="btn-secondary border-asis-ok" disabled>
                        Completado
                      </button>
                    ) : (
                      <select
                        onChange={(e) => {
                          if (e.target.value === "Cancelar") {
                            router.push(`/reserva/cancelar/${app.idApp}`);
                          }
                          if (e.target.value === "Editar") {
                            router.push(`/reserva/editar/${app.idApp}`);
                          }
                        }}
                        className="btn-secondary"
                        name=""
                        id=""
                      >
                        <option className="btn-secondary" value="none">
                          Opciones
                        </option>
                        <option className="btn-secondary" value="Editar">
                          Editar
                        </option>
                        <option className="btn-secondary" value="Cancelar">
                          Cancelar
                        </option>
                      </select>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              style={{ marginBottom: "10px" }}
              count={Math.ceil(length / 7)}
              onChange={handleChange}
            />
          </Stack>
        </div>
      </main>
    </>
  );
}
