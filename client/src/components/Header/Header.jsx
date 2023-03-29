import Link from "next/link";
import Image from "next/image";
import calendar from "../../assets/calendar.svg";
import iconUser from "../../assets/perfil.svg";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
//<Image src={desplegableAbajo} alt="Flecha" />


  

export default function Header({ hide }) {
  if (hide) {
    return null;
  }
  const { data } = useSession();
  return (
    <header className="header-box">
      {data?.user?.name ? <p>hola {data.user.name} </p> : <p>Deslogueado</p>}
      <nav className="nav-box">
        <button className="btn-quaternary padding-one">Reservar</button>
        <div className="options">
          <div className="options-item">
            <Link href="/mis-reservas">Mis reservas </Link>
            <Image src={calendar} alt="calendar" />
          </div>
          <div className="options-item">
            <Link href="/mi-cuenta">Mi cuenta</Link>
            <Image src={iconUser} alt="user" />
          </div>

          <button onClick={async () => await signOut()}>Log out</button>
        </div>
      </nav>
    </header>
  );
}
