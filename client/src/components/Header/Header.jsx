import Link from "next/link";
import Image from "next/image";
import calendar from "../../assets/calendar.svg";
import iconUser from "../../assets/perfil.svg";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
//<Image src={desplegableAbajo} alt="Flecha" />

export default function Header({ hide }) {
  if (hide) {
    return null;
  }
  const { data } = useSession();

  return (
    <header className="header-box">
      <nav className="nav-box">
        <button className="btn-quaternary padding-one">Reservar</button>
        <div className="options">
          <div className="options-item">
            <Link href="/reservas">Mis reservas </Link>
            <Image src={calendar} alt="calendar" />
          </div>
          <div className="options-item">
            <Link href="/user">Mi cuenta</Link>
            <Image src={iconUser} alt="user" />
          </div>
          {data?.user ? (
            <button
              className="btn-quaternary padding-one" style={{marginLeft: '10px'}}
              onClick={async () => await signOut()}
            >
              Log out
            </button>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
