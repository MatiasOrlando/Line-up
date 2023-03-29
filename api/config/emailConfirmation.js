const nodemailer = require("nodemailer");

async function emailConfirmation() {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "lineupwebapp@gmail.com",
      pass: "lqiywvjkcppiukcd",
      // passWindows: hofkzguloatrkcyr,
      // passLinux: plbenacmbfzrqpej
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: '"You" <lineupwebapp@gmail.com>',
    to: "matiassorlando@gmail.com",
    subject: "Testing, testing, 123",
    html: `<h1>Hello there</h1>
    <p>Isn't NodeMailer useful?</p>
    `,
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}

module.exports = emailConfirmation;
