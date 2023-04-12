const InfoReservation = ({ user }) => {
  return (
    <div className="box-reservation-data">
      <p className="info-reservation">Información de la reserva</p>
      <p className="name-reservation">{user.name}</p>
      <p className="date-reservation">
        <span className="span-reservation">Día </span>12/10/2022
      </p>
      <p className="date-reservation">
        <span className="span-reservation">Horario:</span> 13:00 hs
      </p>
      <p className="date-reservation">
        <span className="span-reservation">Sucursal:</span> Villa Crespo
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
