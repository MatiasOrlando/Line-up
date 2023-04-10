import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

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
            <h2>Reservas</h2>
          </div>
          <div className="container-list">
            {branches.map((branch, index) => {
              console.log(branch);
              return (
                <div className="item-list" key={index}>
                  <div className="item-section">
                    <div className="item-title">Nombre y Apellido</div>
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
                    <div className="item-title">
                      Horarios de Inicio y Cierre
                    </div>
                    <div className="item-description">
                      {branch.openingHour} - {branch.closingHour}
                    </div>
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

      <Stack spacing={2} style={{ alignItems: "center" }}>
        <Pagination count={Math.ceil(length / 7)} onChange={handleChange} />
      </Stack>
    </>
  );
}
