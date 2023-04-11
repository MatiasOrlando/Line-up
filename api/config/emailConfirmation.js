const nodemailer = require("nodemailer");

async function passwordUpdate(email, token) {
  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "lineupapp@hotmail.com",
      pass: "Lineup2023",
    },
  });

  let info = await transporter.sendMail({
    from: `lineupapp@hotmail.com`,
    to: `${email}`,
    subject: `Actualiza tu contraseña`,
    html: `<p><b></b><a href="http://localhost:3000/password/${token}">Haz click aqui para cambiar tu contraseña</a></p>
                <p>Sus datos estan protegidos. Muchas gracias por confiar en nosotros.</p>
                <img src=""/>`,
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}
async function appointmentConfirmation(appointment) {
  const branch = appointment[0].sucursal;
  const user = appointment[0].user;
  const createdAt = new Date(appointment[0].createdAt);
  const day = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()}`;
  const hour = `${createdAt.getHours()}:${createdAt.getMinutes()}`;

  let transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "lineupapp@hotmail.com",
      pass: "Lineup2023",
    },
  });

  let info = await transporter.sendMail({
    from: `lineupapp@hotmail.com`,
    to: `${user.email}`,
    subject: `Confirmacion de turno`,
    html: `
    <h2>Turno Confirmado<h2>
    <h2>Reserva ${branch.id}
    <p>Hecho el ${day} a las ${hour} para el ${appointment[0].date} a las ${appointment[0].timeOfAppontment} hs</p>
    <p>Nombre: ${user.name}</p>
    <p>Sucursal: ${branch.name}</p>
    <p>Horario: ${hour}</p>`,
  });
}

module.exports = { passwordUpdate, appointmentConfirmation };
