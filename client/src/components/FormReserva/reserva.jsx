import { DateTime } from "luxon";
import { useEffect } from "react";
import { useState } from "react";
//const nombreMes = dt.get("monthLong").charAt(0).toUpperCase() + dt.get("monthLong").slice(1);

export default function FormReserva({branches}) {
  console.log(branches)
  const today = DateTime.local();
  const initialDayOfCurrentMonth = today.startOf("month").weekday
  const nombreMes =
    today.get("monthLong").charAt(0).toUpperCase() +
    today.get("monthLong").slice(1);
  const year = today.year
  const firstDayOfMonth = today.startOf("month");
  const lastDayOfMonth = today.endOf("month");
  const startOfPreviousMonth = firstDayOfMonth.minus({ days: 6 });
  const endOfNextMonth = lastDayOfMonth.plus({ days: 6 });
  const previousMonthDates = [];

  for (let i = 0; i <= 6; i++) {
    previousMonthDates.push(startOfPreviousMonth.plus({ days: i }));
  }

  const currentMonthDates = [];
  for (let i = 1; i <= lastDayOfMonth.day; i++) {
    currentMonthDates.push(firstDayOfMonth.plus({ days: i  }));
  }

  const nextMonthDates = [];
  for (let i = 6; i >= 0; i--) {
    nextMonthDates.push(endOfNextMonth.minus({ days: i  }));
  }

  currentMonthDates.pop()
  nextMonthDates.shift()

  const calendarDates = [...new Set([...previousMonthDates,...currentMonthDates, ...nextMonthDates])]; 

  const maxItems = 42; 
  const limitedArray = calendarDates.slice(0, Math.min(calendarDates.length, maxItems));

  const ultisimoYfinalArray = limitedArray.slice(initialDayOfCurrentMonth)
  
  
  const [tiempoRestante, setTiempoRestante] = useState(300);

  useEffect(() => {
    const intervalo = setInterval(() => {
      
      setTiempoRestante(tiempoRestante => tiempoRestante - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  
  function formatearTiempo(tiempo) {
    const minutos = Math.floor(tiempo / 60);
    const segundos = tiempo % 60;
    return `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
  }

  function terminarContador() {
    // Recargamos la página
    window.location.reload();
  }

  useEffect(() => {
    if (tiempoRestante === 0) {
      terminarContador();
    }
  }, [tiempoRestante]);

  return (
      <div className="content-container">
        <h1 className="reserva-title">Hacer una reserva</h1>
        <div className="reserva-form-container">
          <h2 className="reserva-title-2">Reserva</h2>
          <h3 className="reserva-title-3">Seleccioná tu sucursal</h3>
          <p>form check</p>
          <h3 className="reserva-title-3">Sucursal</h3>
          <select className="input-primary w100">
            {branches.map((name, i) =>{
              return (<option key={i}>
                {name}
              </option>)
            })}
          </select>
        </div>
        <div className="calendar-container">
          <h2>{nombreMes} {year}</h2>
          <ol>
            <li className="day-name">Do</li>
            <li className="day-name">Lu</li>
            <li className="day-name">Ma</li>
            <li className="day-name">Mi</li>
            <li className="day-name">Ju</li>
            <li className="day-name">Vi</li>
            <li className="day-name">Sa</li>
            {ultisimoYfinalArray.map((day,i) => {
              return  <button className="calendary-days" key={i}>{day.day}</button>;
            })}
          </ol>
        </div>
        <div className="countdown-container">
        <button className="btn-primary sc">Quedan {formatearTiempo(tiempoRestante)}</button>
        </div>
      </div>
  );
}