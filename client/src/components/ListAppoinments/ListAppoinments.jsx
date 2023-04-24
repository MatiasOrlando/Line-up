import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import axios from "axios";

export default function ListAppoinments({ branches, length, token }) {
  const router = useRouter();

  const handleChange = (event, value) => {
    router.push(`/operadorReservas/${value}`);
  };

  const handleEdit = async (status, id) => {
    if (status === "Cancel") return;
    const cancel = await axios.put(
      `http://localhost:3001/api/operator/appointment/${id}/token?token=${token.user}`,
      { status }
    );
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
              const createdAt = new Date(app.createdAt);
              const day = `${createdAt.getDate()}/${
                createdAt.getMonth() + 1
              }/${createdAt.getFullYear()}`;
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
                    <div className="item-description">{day}</div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">N° de la reserva</div>
                    <div className="item-description">{app.idApp}</div>
                  </div>
                  <div className="item-section">
                    {app.status === "Cancel" ? (
                      <button disabled className="btn-primary">
                        Cancelado
                      </button>
                    ) : (
                      <>
                        {app.status === "pending" ? (
                          <select
                            className="btn-secondary"
                            name=""
                            id=""
                            onChange={(e) => {
                              e.preventDefault();
                              handleEdit(e.target.value, app.id);
                            }}
                          >
                            <option className="btn-secondary" value="pending">
                              Confirmado
                            </option>
                            <option className="btn-secondary" value="completed">
                              Completado
                            </option>
                          </select>
                        ) : (
                          <>
                            <button
                              className="btn-secondary border-asis-ok"
                              disabled
                              value="completed"
                            >
                              Completado
                            </button>
                          </>
                        )}
                      </>
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
