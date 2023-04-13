import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ListBranches({ branches, length }) {
  const router = useRouter();
  const handleChange = (event, value) => {
    router.push(`/sucursales/${value}`);
  };

  return (
    <>
      <main className="container-appointments">
        <div className="container-appointments_box">
          <div className="box-title">
            <h2>Sucursales</h2>
          </div>
          <div className="container-list">
            {branches.map((branch, index) => {
              return (
                <div className="item-list" key={index}>
                  <div className="item-section">
                    <div className="item-title">Nombre</div>
                    <div className="item-description">{branch.name}</div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">Mail</div>
                    <div className="item-description">{branch.email}</div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">Capacidad maxima</div>
                    <div className="item-description">
                      {branch.allowedClients}
                    </div>
                  </div>
                  <div className="item-section">
                    <div className="item-title">Horario de Inicio y Cierre</div>
                    <div className="item-description">
                      {branch.openingHour} - {branch.closingHour} hs
                    </div>
                  </div>
                  <div className="item-section">
                    <button className="btn-secondary" name="" id="">
                      <Link
                        href={`/sucursales/editar/${branch.id}`}
                        className="link"
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

      <Stack spacing={2} style={{ alignItems: "center" }}>
        <Pagination count={Math.ceil(length / 7)} onChange={handleChange} />
      </Stack>
    </>
  );
}
