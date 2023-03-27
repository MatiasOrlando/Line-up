import Link from "next/link";
import { ReactComponent as CalendarIcon } from "../../assets/calendar.svg";

export default function Header() {
  return (
    <header className="header-box">
      <nav className="nav-box">
        <button className="btn-quaternary">Reservar</button>
        <div className="options">
          <Link href="/mis-reservas">Mis reservas</Link>
          <Link href="/mi-cuenta">Mi cuenta</Link>
        </div>
      </nav>
    </header>
  );
}
