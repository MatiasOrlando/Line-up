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
            <h2>Reservas</h2>
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
                    <Link href={`/operadores/editar/${operador.id}`}>
                      <button className="btn-secondary" name="" id="">
                        Editar
                      </button>
                    </Link>
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
