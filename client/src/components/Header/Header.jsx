import Link from "next/link";
import Image from "next/image";
import calendar from "../../assets/calendar.svg";
import iconUser from "../../assets/perfil.svg";
import note from "../../assets/note.svg";
import operate from "../../assets/operate.svg";
import branchIcon from "../../assets/branch.svg";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useVerification from "@/hooks/useVerification";
import axios from "axios";

export default function Header({ hide }) {
  let { data, user } = useVerification();

  if (hide) {
    return null;
  }

  const adminOptions = () => {
    return (
      <>
        <div className="options-item">
          <Link href="/sucursales/1">
            <span>Sucursales</span>
            <Image src={branchIcon} alt="sucursales" />
          </Link>
        </div>
        <div className="options-item">
          <Link href="/operadores/1" className="link-text">
            <span>Operadores</span>
            <Image src={operate} alt="operadores" className="link-icon" />
          </Link>
        </div>
        <div className="options-item">
          <Link href="/reportes">
            <span>Reportes</span>
            <Image src={note} alt="reportes" />
          </Link>
        </div>
      </>
    );
  };
  return (
    <header className="header-box">
      <nav className="nav-box">
        <div className="box-btn">
          {user?.operator ? (
            ""
          ) : (
            <Link href={user?.admin ? "/crearSucursal" : "/reserva"}>
              <button className="btn-quaternary padding-one ">
                {user?.admin ? "Crear sucursal" : "Reservar"}
              </button>
            </Link>
          )}
          {user?.admin ? (
            <Link href="/crearOperador">
              <button className="btn-quaternary padding-one ">
                Crear operador
              </button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="options">
          {user?.admin ? adminOptions() : ""}
          {!user?.admin && (
            <>
              <div className="options-item">
                <Link
                  href={user?.operator ? "/operadorReservas/1" : "/reservas/1"}
                >
                  <span>{user?.operator ? "Reservas" : "Mis Reservas"}</span>
                  <Image src={calendar} alt="reservas" />
                </Link>
              </div>
            </>
          )}
          <div className="options-item">
            <Link href="/user">
              <span>Mi cuenta</span>
              <Image src={iconUser} alt="user" />
            </Link>
          </div>
          {data?.user ? (
            <button
              className="btn-quaternary padding-one"
              style={{ marginLeft: "10px" }}
              onClick={async () =>
                await signOut({ redirect: true, callbackUrl: "/" })
              }
            >
              Log out
            </button>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
