import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function FormReserva({ branches }) {
  const [tiempoRestante, setTiempoRestante] = useState(300);
  const [datesAvailable, setDatesAvailable] = useState([]);
  const [hoursAvailable, setHoursAvailable] = useState([]);


  const router = useRouter();
  const pathname = router.pathname;

  let selectedBranch = "";
  let horario = [];
  let show = false;

  const today = DateTime.local();
  const initialDayOfCurrentMonth = today.startOf("month").weekday;
  const nombreMes =
    today.get("monthLong").charAt(0).toUpperCase() +
    today.get("monthLong").slice(1);
  const year = today.year;
  const firstDayOfMonth = today.startOf("month");
  const lastDayOfMonth = today.endOf("month");
  const lastDayOfPreviousMonth = firstDayOfMonth.minus({ days: 1 });
  const maxItems = 42;
  const loadingData = new Array(42).fill("x", 0, maxItems);
  let aux = initialDayOfCurrentMonth - 1;
  const currentMonthDates = [];

  useEffect(() => {
    if (pathname === "/reserva") document.body.classList.add("bg-grey2");
  }, [pathname]);

  for (let i = 0; i < lastDayOfMonth.day; i++) {
    currentMonthDates.push(firstDayOfMonth.plus({ days: i }));
  }

  loadingData.splice(
    initialDayOfCurrentMonth,
    loadingData.length,
    ...currentMonthDates
  );
  for (let i = 0; i <= initialDayOfCurrentMonth - 1; i++) {
    loadingData[i] = lastDayOfPreviousMonth.minus({ days: aux });
    aux--;
  }
  aux = 1;
  if (loadingData.length > 35) {
    for (let i = loadingData.length + 1; i < 43; i++) {
      loadingData[i] = lastDayOfMonth.plus({ days: aux });
      aux++;
    }
  } else {
    for (let i = loadingData.length + 1; i < 36; i++) {
      loadingData[i] = lastDayOfMonth.plus({ days: aux });
      aux++;
    }
  }

  /* useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoRestante((tiempoRestante) => tiempoRestante - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []); */

  function formatearTiempo(tiempo) {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    return `${minutos}:${segundos < 10 ? "0" : ""}${segundos}`;
  }

  function terminarContador() {
    window.location.reload();
  }

  useEffect(() => {
    if (tiempoRestante === 0) {
      terminarContador();
    }
  }, [tiempoRestante]);

  const arr = [];

  loadingData.forEach((date) => {
    arr.push(date.toFormat("dd-MM-yyyy"));
  });

  const fechasFiltradas = arr.filter((fecha) => {
    const fechaComparar = DateTime.fromFormat(fecha, "dd-MM-yyyy");
    return fechaComparar >= today;
  });

  fechasFiltradas.unshift(today.toFormat("dd-MM-yyyy")); //enviar al back

  const toggleEnabled = function (element, enable) {
    if (!enable) {
      element.disabled = false;
      element.addEventListener("click",handleClick)
    } else {
      element.disabled = true;
    }
  };

  

  const handleChange = async (e) => {
    const branch = e.target.value;
    if (branch !== "Selecciona una opcion") {
      selectedBranch = branch
      const datesAvailables = await axios.post(
        "http://localhost:3001/api/appointments/daysavailable",
        {
          days: fechasFiltradas,
          branch: branch,
        }
      );
      loadingData.forEach((fecha, i) => {
        datesAvailables.data.forEach((date) => {
          if (fecha.toFormat("dd-MM-yyyy") === date) {
            const element = document.getElementById(i);

            /* const activar = document.getElementsByClassName("color-grey4");
            activar.classList.remove("color.grey4");
            */
            toggleEnabled(element);
            setDatesAvailable(datesAvailables);
          }
        });
      });
    } else {
      selectedBranch = ""
      loadingData.forEach((fecha, i) => {
        fecha.toFormat("dd-MM-yyyy");
        const element = document.getElementById(i);
        toggleEnabled(element, true);
      });
    }
  };

  const handleClick = async (e) => {
    const selectedDate=e.target.value;

    const hours = await axios.post("http://localhost:3001/api/appointments/hoursavailable",{
      branch:selectedBranch,
      day:selectedDate
    })

    horario = hours.data
    show = true
  };

  useEffect(()=>{},[show])

  return (
    <div className="content-container">
      <h1 className="reserva-title">Hacer una reserva</h1>
      <div className="reserva-form-container">
        <h2>Reserva</h2>
        <h3 className="reserva-title-3">Seleccioná tu sucursal</h3>
        <p>form check</p>
        <h3 className="reserva-title-3">Sucursal</h3>
        <select className="input-primary w100" onChange={handleChange}>
          <option value="Selecciona una opcion">Selecciona una opción</option>
          {branches.map((name) => {
            return (
              <option value={name} key={name}>
                {name}
              </option>
            );
          })}
        </select>


        <div key={show}>{ show ? <> <h3 className="reserva-title-3">Horario</h3>
        <select className="input-primary w100" onChange={handleChange}>
          <option value="Selecciona una opcion">Selecciona una opción</option>
          {branches.map((name) => {
            return (
              <option value={name} key={name}>
                {name}
              </option>
            );
          })}
        </select></> : null}</div>



        {/* <form action="submit">

        </form> */}


      </div>
      <div className="calendar-container color-grey4">
        <h2>
          {nombreMes} {year}
        </h2>
        <div className="grid-container">
          <div className="day-name color-grey4">Do</div>
          <div className="day-name color-grey4">Lu</div>
          <div className="day-name color-grey4">Ma</div>
          <div className="day-name color-grey4">Mi</div>
          <div className="day-name color-grey4">Ju</div>
          <div className="day-name color-grey4">Vi</div>
          <div className="day-name color-grey4">Sa</div>
          {loadingData.map((day, i) => {
            return (
              <button
                disabled={true}
                className="calendary-days button-day"
                onClick={handleClick}
                key={i}
                id={i}
                value={day.toFormat("dd-MM-yyyy")}
              >
                {day.day}
              </button>
            );
          })}
        </div>
      </div>
      <div className="countdown-container">
        <button className="btn-primary sc">
          Quedan {formatearTiempo(tiempoRestante)}
        </button>
      </div>
    </div>
  );
}
