import { DateTime } from "luxon";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Modal from "@/commons/Modal";
import { BsCheckSquare } from "react-icons/bs";

export default function FormReserva({ branches, user }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(300);
  const [datesAvailable, setDatesAvailable] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [invalidHour, setInvalidHour] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [message, setMessage] = useState("");
  const [selectedHour, setSelectedHour] = useState("Selecciona una opcion");
  const [dia, setDia] = useState("");
  const [show, setShow] = useState(false);
  const [auxEffect, setAuxEffect] = useState(false);
  const [horarios, setHorarios] = useState([]);
  const [monthDay, setMonthDay] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const router = useRouter();
  const rute = useRouter();
  const dayRef = useRef();
  let count = 1;
  let horario = [];

  const today = DateTime.utc().setZone("America/Argentina/Buenos_Aires");
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

  useEffect(() => {
    const intervalo = setInterval(() => {
      setTiempoRestante((tiempoRestante) => tiempoRestante - 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

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

  fechasFiltradas.unshift(today.toFormat("dd-MM-yyyy"));
  const toggleEnabled = function (element, enable) {
    if (!enable) {
      element.disabled = false;
      element.addEventListener("click", handleClick);
    } else {
      element.disabled = true;
    }
  };

  const handleChange = async (e) => {
    setMessage("");
    loadingData.forEach((date, i) => {
      const test = document.getElementById(i);
      test.disabled = true;
      test.classList.remove("dayPicked");
    });

    if (e.target.value !== "Selecciona una opcion") {
      setVio({
        ...vio,
        color: vio.color === "green" ? "violet" : "green",
        value: "✓",
        lineColor: vio.color === "green" ? "violetLine" : "greenLine",
        className: vio.color === "green" ? "fontViolet" : "fontGreen",
      });
      setGra({
        ...gra,
        color: gra.color === "green" ? "gray" : "violet",
        lineColor: gra.color === "green" ? "greyLine" : "violetLine",
        className: gra.color === "green" ? "fontGray" : "fontViolet",
        value: 2,
      });
      setGra2({
        ...gra2,
        color:
          gra.color === "green" || vio.color === "violet" ? "gray" : "violet",
        lineColor:
          gra.color === "green" || vio.color === "violet"
            ? "greyLine"
            : "violetLine",
        className:
          gra.color === "green" || vio.color === "violet"
            ? "fontGray"
            : "fontViolet",
        value: 3,
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
      setSelectedBranch(branch);
      const datesAvailables = await axios.post(
        "http://localhost:3001/api/appointments/daysavailable",
        {
          days: fechasFiltradas,
          branch: branch,
          email: user.email,
        }
      );
      loadingData.forEach((fecha, i) => {
        datesAvailables.data.arrayToSend.day;
        const filteredArray = datesAvailables.data.arrayToSend.filter(
          (element) => !datesAvailables.data.turnos.includes(element.day)
        );
        filteredArray.forEach((date) => {
          if (fecha.toFormat("dd-MM-yyyy") === date.day) {
            const element = document.getElementById(i);
            const h2 = document.getElementsByClassName("changecolortoblack");
            h2[0].style.color = "black";
            const dayName = document.getElementsByClassName("day-name");
            Array.from(dayName).map((element) => {
              element.classList.remove("color-grey4");
              element.style.color = "#6e6e6e";
            });
            toggleEnabled(element);
            setDatesAvailable(datesAvailables.data.arrayToSend);
          }
        });
      });
    } else {
      setSelectedBranch("");
      loadingData.forEach((fecha, i) => {
        fecha.toFormat("dd-MM-yyyy");
        const element = document.getElementById(i);
        toggleEnabled(element, true);
      });
    }
  };

  useEffect(() => {
    if (datesAvailable.length > 0 && dia !== "") {
      datesAvailable.forEach((elementObj) => {
        if (elementObj.day === dia) {
          if (elementObj.availables < 10)
            setMessage(
              `Quedan solo ${elementObj.availables} turnos disponibles 🔥`
            );
        }
      });
    }
  }, [auxEffect]);

  const handleClick = async (e) => {
    setMessage("");
    const dayValue = dayRef.current.value;
    setDia(e.target.value);
    setAuxEffect(count++);

    loadingData.forEach((date, i) => {
      const test = document.getElementById(i);
      test.classList.remove("dayPicked");
    });

    e.target.classList.add("dayPicked");

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
    setSelectedDay(selectedDate);
    const hours = await axios.post(
      "http://localhost:3001/api/appointments/hoursavailable",
      {
        branch: dayValue,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedHour == "Selecciona una opcion") {
      return setInvalidHour(true);
    }

    e.target.disabled = true;

    setGra2({
      ...gra2,
      color: "green",
      value: "✓",
      lineColor: "greenLine",
      className: "fontGreen",
    });
    axios
      .post("http://localhost:3001/api/appointments/add", {
        branch: selectedBranch,
        name: user.name,
        email: user.email,
        phoneNew: newPhone || user.phone,
        day: selectedDay,
        time: selectedHour,
      })
      .then(() => setModalIsOpen(true));
  };

  return (
    <>
      <div className="content-container">
        <h1 className="reserva-title">Hacer una reserva</h1>
        <div className="reserva-form-container">
          <h2>Reserva</h2>
          <h3
            style={{ marginTop: "2rem", marginBottom: "2.5rem" }}
            className="reserva-title-3"
          >
            Completá el formulario
          </h3>
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
          <h3
            style={{ marginTop: "6rem", marginBottom: "0.5rem" }}
            className="reserva-title-3"
          >
            Sucursal
          </h3>
          <select
            className="input-primary w100"
            onChange={handleChange}
            ref={dayRef}
          >
            <option value="Selecciona una opcion">Selecciona una opcion</option>
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
              <h3
                className="reserva-title-3"
                style={{ marginTop: "2rem", marginBottom: "0.5rem" }}
              >
                Horario
              </h3>
              <select
                className="input-primary w100"
                onChange={(e) => {
                  if (e.target.value != "Selecciona una opcion") {
                    setInvalidHour(false);
                  }
                  setSelectedHour(e.target.value);
                }}
              >
                <option value="Selecciona una opcion">
                  Selecciona una opcion
                </option>

                {horarios.map((hora) => {
                  return (
                    <option value={hora} key={hora}>
                      {hora}
                    </option>
                  );
                })}
              </select>
              {invalidHour && (
                <span style={{ color: "red" }}>
                  Por favor, seleccioná un horario válido
                </span>
              )}
              {/* A ESTE FORM SE LE COLOCA LA CLASE:  formReserva !!!!!!!!!!!!!!!!!!!!!!!!! */}
              <form className="formReserva w100" action="">
                <div
                  style={{
                    width: "100%",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "49%" }}>
                    <h3
                      className="reserva-title-3"
                      style={{ marginBottom: "0.5rem" }}
                    >
                      Nombre y Apellido
                    </h3>
                    <input
                      disabled={true}
                      defaultValue={user.name}
                      className="input-primary"
                      style={{ width: "100%" }}
                      type="text"
                    />
                  </div>
                  <div style={{ justifyContent: "center", width: "50%" }}>
                    <h3
                      className="reserva-title-3"
                      style={{ marginBottom: "0.5rem" }}
                    >
                      Telefono
                    </h3>
                    <input
                      defaultValue={user.phone}
                      className="input-primary"
                      style={{ width: "100%" }}
                      type="text"
                      onChange={(e) => {
                        setNewPhone(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <h3
                  className="reserva-title-3"
                  style={{ marginBottom: "0.5rem" }}
                >
                  Mail
                </h3>
                <input
                  disabled={true}
                  defaultValue={user.email}
                  className="input-primary w100"
                  type="text"
                />
                <button
                  className="btn-primary"
                  type="submit"
                  style={{ marginTop: "3rem" }}
                  onClick={(e) => {
                    handleSubmit(e);
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
                  Confirmar reserva
                </button>
              </form>
            </>
          )}
        </div>
        <div className="calendar-container color-grey4">
          <h2 className="changecolortoblack">
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
                  onClick={() => handleClick()}
                  key={i}
                  id={i}
                  value={day.toFormat("dd-MM-yyyy")}
                >
                  {day.day}
                </button>
              );
            })}
          </div>
          {message && (
            <span style={{ fontSize: "15px", color: "#e53939" }}>
              {message}
            </span>
          )}
        </div>
        <div className="countdown-container">
          <button className="btn-primary sc">
            Quedan {formatearTiempo(tiempoRestante)}
          </button>
        </div>
      </div>
      <Modal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        redirect={{ function: router.push, rute: "/reserva/confirmacion" }}
        modalContent={{
          title: "Turno reservado con éxito",
          description: "Gracias por confiar en nuestro servicio",
          button: "Aceptar",
          icon: <BsCheckSquare className="icon" />,
        }}
      ></Modal>
    </>
  );
}
