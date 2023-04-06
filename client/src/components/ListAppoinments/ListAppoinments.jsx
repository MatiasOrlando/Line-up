import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

export default function ListAppoinments({ branches, length }) {
  const router = useRouter();

  const handleChange = (event, value) => {
    router.push(`/operadorReservas/${value}`);
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
                    <div className="item-description">{app.user}</div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">Reserva</div>
                    <div className="item-description">
                      {app.date}-{app.timeOfAppontment}
                    </div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">Dia de la reserva</div>
                    <div className="item-description">
                      {/*app.createAt*/} 10/10/2022
                    </div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">N° de la reserva</div>
                    <div className="item-description">{app.id}</div>
                  </div>
                  <div className="item-section">
                    <select className="btn-secondary" name="" id="">
                      <option className="btn-secondary" value="none">
                        Confirmacion
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
      <Stack spacing={2} style={{ alignItems: "center" }}>
        <Pagination count={Math.ceil(length / 7)} onChange={handleChange} />
      </Stack>
    </>
  );
}
