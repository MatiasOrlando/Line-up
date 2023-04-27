const nodemailer = require("nodemailer");
require("dotenv").config();

async function passwordUpdate(email, token) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.USER_GMAIL,
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
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: process.env.USER_GMAIL,
      to: `${user.email}`,
      subject: `Confirmacion de turno`,
      html: `
    <h2>Turno Confirmado<h2>
    <h2>Reserva ${branch.id}
    <p>Hecho el ${day} a las ${hour} para el ${appointment[0].date} a las ${appointment[0].timeOfAppoinment} hs</p>
    <p>Nombre: ${user.name}</p>
    <p>Sucursal: ${branch.name}</p>
    <p>Horario: ${hour}</p>`,
    });
  } catch {
    return;
  }
}

async function accountActivation(email, token) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.USER_GMAIL,
    to: `${email}`,
    subject: `Activa tu cuenta`,
    html: `<p><b></b><a href="http://localhost:3000?secret=${token}">Haz click aqui en este link activar tu cuenta</a></p>
                <p>Sus datos estan protegidos. Muchas gracias por confiar en nosotros.</p>
                <img src=""/>`,
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}

async function cancelAppointmentEmail(appointment) {
  const email = appointment.user.email;
  const branchName = appointment.sucursal.name;
  const timeOfAppoinment = appointment.timeOfAppoinment;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.USER_GMAIL,
    to: `${email}`,
    subject: `Turno cancelado`,
    html: `<p><b></b>Su reserva ha sido cancelada exitosamente. Le agradecemos por informarnos.</></p>
                <h2>Turno Cancelado</h2>
                <h2>Reserva ${appointment.idApp}</h2>
                <p>Nombre: ${appointment.user.name}</p>
                <p>Sucursal: ${branchName}</p>
                <p>Horario: ${timeOfAppoinment}</p>
                <p>Esperamos que vuelva pronto. Muchas gracias por confiar en nosotros.</p>
             `,
  });
}

async function editAppointmentEmail(appointment) {
  const email = appointment.user.email;
  const branchName = appointment.sucursal.name;
  const timeOfAppoinment = appointment.timeOfAppoinment;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.USER_GMAIL,
    to: `${email}`,
    subject: `Turno editado`,
    html: `<p><b></b>Su reserva ha sido editada exitosamente. Le agradecemos por informarnos.</></p>
                <h2>Turno Editado</h2>
                <h2>Reserva ${appointment.idApp}</h2>
                <p>Nombre: ${appointment.user.name}</p>
                <p>Sucursal: ${branchName}</p>
                <p>Horario: ${timeOfAppoinment}</p>
                <p>Muchas gracias por confiar en nosotros. Esperamos que haya tenido una excelente experiencia con nuestro servicio</p>
             `,
  });
}

module.exports = {
  passwordUpdate,
  appointmentConfirmation,
  accountActivation,
  cancelAppointmentEmail,
  editAppointmentEmail,
};
