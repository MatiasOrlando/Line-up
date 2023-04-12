import nodemailer from "nodemailer";


export const emailConfirmation = async(email: string): Promise <void> =>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "lineupwebapp@gmail.com",
            pass: "lqiywvjkcppiukcd",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let info = await transporter.sendMail({
        from: '"You" <lineupwebapp@gmail.com>',
    to: `${email}`,
    subject: "Testing, testing, 123",
    html: `<h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
    });
    console.log(info.messageId);
}

export const passwordUpdate = async (email: string, token: string): Promise <void> => {
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