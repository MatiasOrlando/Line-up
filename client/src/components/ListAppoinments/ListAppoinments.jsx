import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import axios from "axios";

export default function ListAppoinments({ branches, length, token }) {
  const router = useRouter();

  console.log(branches);

  const handleChange = (event, value) => {
    router.push(`/operadorReservas/${value}`);
  };

  const handleEdit = async (status, id) => {
    if (status === "Cancel") return;
    const cancel = await axios.put(
      `http://localhost:3001/api/operator/appointment/${id}/token?token=${token.user}`,
      { status }
    );
    console.log(cancel);
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
                    {app.status === "Cancel" ? (
                      <button disabled className="btn-primary">
                        Cancelado
                      </button>
                    ) : (
                      <>
                        <select
                          className="btn-secondary"
                          name=""
                          id=""
                          onClick={(e) => {
                            e.preventDefault();
                            handleEdit(e.target.value, app.id);
                          }}
                        >
                          {app.status === "pending" ? (
                            <>
                              <option className="btn-secondary" value="pending">
                                Confirmado
                              </option>
                              <option
                                className="btn-secondary"
                                value="completed"
                              >
                                Asistido
                              </option>
                            </>
                          ) : (
                            <>
                              <option
                                className="btn-secondary"
                                value="completed"
                              >
                                Asistido
                              </option>
                              <option className="btn-secondary" value="pending">
                                Confirmado
                              </option>
                            </>
                          )}
                        </select>
                      </>
                    )}
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
