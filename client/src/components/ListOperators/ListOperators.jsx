import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ListOperators({ dataOperadores, length }) {
  const router = useRouter();

  const handleChange = (event, value) => {
    router.push(`/sucursales/${value}`);
  };

  return (
    <>
      <main className="container-appointments">
        <div className="container-appointments_box">
          <div className="box-title">
            <h2>Operadores</h2>
          </div>
          <div className="container-list">
            {dataOperadores.map((operador, index) => {
              return (
                <div className="item-list" key={index}>
                  <div className="item-section">
                    <div className="item-title">Nombre y Apellido</div>
                    <div className="item-description">{operador.name}</div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">Mail</div>
                    <div className="item-description">{operador.email}</div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">Sucursal</div>
                    <div className="item-description">
                      {operador.sucursal[0]?.location}
                    </div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">Contraseña</div>
                    <div className="item-description">
                      <input
                        type="password"
                        className="input-salt"
                        disabled
                        defaultValue={operador.salt || ""}
                      />
                    </div>
                  </div>
                  <div className="item-section">
                    <button className="btn-secondary" name="" id="">
                      <Link
                        href={`/operadores/editar/${operador.id}`}
                        style={{ textDecoration: "none", color: "#a442f1" }}
                      >
                        Editar
                      </Link>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <div className="pagination">
        <Stack spacing={2}>
          <Pagination
            style={{ marginBottom: "10px" }}
            count={Math.ceil(length / 7)}
            onChange={handleChange}
          />
        </Stack>
      </div>
    </>
  );
}
