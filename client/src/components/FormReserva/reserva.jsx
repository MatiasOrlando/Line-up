import { DateTime } from "luxon";
import { useEffect } from "react";
import { useState } from "react";
//const nombreMes = dt.get("monthLong").charAt(0).toUpperCase() + dt.get("monthLong").slice(1);

export default function FormReserva() {
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

  const [tiempoRestante, setTiempoRestante] = useState(300);

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

  const arr=[]

  loadingData.forEach(date => {
   arr.push(date.toFormat("dd-MM-yyyy"))
  });

  const fechasFiltradas = arr.filter(fecha => {
    const fechaComparar = DateTime.fromFormat(fecha, 'dd-MM-yyyy');
    return fechaComparar >= today;
  });

  fechasFiltradas.unshift(today.toFormat("dd-MM-yyyy"))//enviar al back

  return (
    <div className="master-div">
      <div className="content-container">
        <h1 className="reserva-title">Hacer una reserva</h1>
        <div className="reserva-form-container">
          <h2 className="reserva-title-2">Reserva</h2>
          <h3 className="reserva-title-3">Seleccioná tu sucursal</h3>
          <p>form check</p>
          <h3 className="reserva-title-3">Sucursal</h3>
          <select className="input-primary w100" />
        </div>
        <div className="calendar-container" >
          <h2>
            {nombreMes} {year}
          </h2>
          <ol>
            <li className="day-name">Do</li>
            <li className="day-name">Lu</li>
            <li className="day-name">Ma</li>
            <li className="day-name">Mi</li>
            <li className="day-name">Ju</li>
            <li className="day-name">Vi</li>
            <li className="day-name">Sa</li>
            {loadingData.map((day, i) => {
              return (
                <button disabled={true} className="calendary-days button-day" key={i}>
                  {day.day}
                </button>
              );
            })}
          </ol>
        </div>
        <div className="countdown-container">
          <button className="btn-primary sc">
            Quedan {formatearTiempo(tiempoRestante)}
          </button>
        </div>
      </div>
    </div>
  );
}
