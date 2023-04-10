import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function FormReserva({ branches }) {
  const [tiempoRestante, setTiempoRestante] = useState(300);
  const [datesAvailable, setDatesAvailable] = useState([]);
  const [show, setShow] = useState(false);
  const [hoursAvailable, setHoursAvailable] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [monthDay, setMonthDay] = useState("");
  const router = useRouter();
  const pathname = router.pathname;

  let selectedBranch = "";
  let horario = [];

  const today = DateTime.local();
  const initialDayOfCurrentMonth = today.startOf("month").weekday;
  const year = today.year;
  const firstDayOfMonth = today.startOf("month");
  const lastDayOfMonth = today.endOf("month");
  const lastDayOfPreviousMonth = firstDayOfMonth.minus({ days: 1 });
  const maxItems = 42;
  const loadingData = new Array(42).fill("x", 0, maxItems);
  let aux = initialDayOfCurrentMonth - 1;
  const currentMonthDates = [];

  useEffect(() => {
    const nombreMes =
      today.get("monthLong").charAt(0).toUpperCase() +
      today.get("monthLong").slice(1);
    setMonthDay(nombreMes);
  }, []);

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
      element.addEventListener("click", handleClick);
    } else {
      element.disabled = true;
    }
  };

  const handleChange = async (e) => {
    console.log(e.target.value);
    if (e.target.value !== "Selecciona una opcion") {
      setVio({
        ...vio,
        color: "green",
        value: "✓",
        lineColor: "greenLine",
        className: "fontGreen",
      });
      setGra({
        ...gra,
        color: "violet",
        lineColor: "violetLine",
        className: "fontViolet",
        value: 2,
      });
    }

    if (e.target.value === "Selecciona una opcion") {
      setVio({
        color: "violet",
        value: 1,
        lineColor: "violetLine",
        text: "Elegí tu sucursal",
        className: "fontViolet",
      });

      setGra({
        color: "gray",
        value: 2,
        lineColor: "greyLine",
        text: "Seleccioná el día",
        className: "fontGray",
      });
      setGra2({
        color: "gray",
        value: 3,
        lineColor: "greyLine",
        text: "Completá el formulario",
        className: "fontGray",
      });
    }
    setShow(false);
    const branch = e.target.value;
    if (branch !== "Selecciona una opcion") {
      selectedBranch = branch;
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
      selectedBranch = "";
      loadingData.forEach((fecha, i) => {
        fecha.toFormat("dd-MM-yyyy");
        const element = document.getElementById(i);
        toggleEnabled(element, true);
      });
    }
  };

  const handleClick = async (e) => {
    setGra({
      ...gra,
      color: "green",
      value: "✓",
      lineColor: "greenLine",
      className: "fontGreen",
    });
    setGra2({
      ...gra2,
      color: "violet",
      lineColor: "violetLine",
      className: "fontViolet",
    });

    const selectedDate = e.target.value;

    const hours = await axios.post(
      "http://localhost:3001/api/appointments/hoursavailable",
      {
        branch: selectedBranch,
        day: selectedDate,
      }
    );

    horario = hours.data;
    setHorarios(horario);
    setShow(true);
  };

  const [vio, setVio] = useState({
    color: "violet",
    value: 1,
    lineColor: "violetLine",
    text: "Elegí tu sucursal",
    className: "fontViolet",
  });

  const [gra, setGra] = useState({
    color: "gray",
    value: 2,
    lineColor: "greyLine",
    text: "Seleccioná el día",
    className: "fontGray",
  });

  const [gra2, setGra2] = useState({
    color: "gray",
    value: 3,
    lineColor: "greyLine",
    text: "Completá el formulario",
    className: "fontGray",
  });

  return (
    <div className="content-container">
      <h1 className="reserva-title">Hacer una reserva</h1>
      <div className="reserva-form-container">
        <h2>Reserva</h2>
        <div className="containerMother">
          <div className="checkboxContainer">
            <input type="button" className={vio.color} value={vio.value} />
            <hr className={vio.lineColor} />
            <div className={vio.className}>{vio.text}</div>
          </div>

          <div className="checkboxContainer">
            <input type="button" className={gra.color} value={gra.value} />
            <hr className={gra.lineColor} />
            <div className={gra.className}>{gra.text}</div>
          </div>

          <div className="checkboxContainer">
            <input type="button" className={gra2.color} value={gra2.value} />
            <hr className={gra2.lineColor} />
            <div className={gra2.className}>{gra2.text}</div>
          </div>
        </div>
        <p style={{ marginTop: "50px" }}>form check</p>
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

        {show && (
          <>
            <h3 className="reserva-title-3">Horario</h3>
            <select
              className="input-primary w100"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            >
              <option value="Selecciona una opcion">
                Selecciona una opción
              </option>
              {console.log(horarios)}
              {horarios.map((hora) => {
                return (
                  <option value={hora} key={hora}>
                    {hora}
                  </option>
                );
              })}
            </select>
            {/* A ESTE FORM SE LE COLOCA LA CLASE:  formReserva !!!!!!!!!!!!!!!!!!!!!!!!! */}
            <form className="formReserva w100" action="">
              <div className="w50">
                <h3 className="reserva-title-3">Nombre y Apellido</h3>
                <input className="input-primary w95" type="text" />
              </div>
              <div style={{ justifyContent: "center" }} className="w50">
                <h3 className="reserva-title-3">Telefono</h3>
                <input className="input-primary w95" type="text" />
              </div>
              <h3 className="reserva-title-3">Mail</h3>
              <input className="input-primary w100" type="text" />
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  setGra2({
                    ...gra2,
                    color: "green",
                    value: "✓",
                    lineColor: "greenLine",
                    className: "fontGreen",
                  });
                }}
              >
                PRUEBA DE FINALIZAR
              </button>
            </form>
          </>
        )}
      </div>
      <div className="calendar-container color-grey4">
        <h2>
          {monthDay} {year}
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
