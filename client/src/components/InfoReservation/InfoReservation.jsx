const InfoReservation = ({ user, appointment }) => {
  return (
    <div className="box-reservation-data">
      <p className="info-reservation">Información de la reserva</p>
      <p className="name-reservation">{user.name}</p>
      <p className="date-reservation">
        <span className="span-reservation">Día </span>
        {appointment.date}
      </p>
      <p className="date-reservation">
        <span className="span-reservation">Horario:</span>{" "}
        {appointment.timeOfAppoinment} hs
      </p>
      <p className="date-reservation">
        <span className="span-reservation">Sucursal:</span>{" "}
        {appointment.sucursal.name}
      </p>
      <hr
        style={{
          marginTop: "17px",
          width: "282px",
          height: "0px",
          alignSelf: "stretch",
          border: "1px solid #E1E1E1",
        }}
      />
    </div>
  );
};

export default InfoReservation;
