import Link from "next/link";
import Image from "next/image";
import calendar from "../../assets/calendar.svg";
import iconUser from "../../assets/perfil.svg";

//<Image src={desplegableAbajo} alt="Flecha" />

export default function Header() {
  return (
    <header className="header-box">
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
        </div>
      </nav>
    </header>
  );
}
