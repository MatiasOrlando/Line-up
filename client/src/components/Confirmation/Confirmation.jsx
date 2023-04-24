import React from "react";
import { BsCheckSquare } from "react-icons/bs";
import { AiOutlineTool } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Link from "next/link";

export default function Confirmation({ appointments }) {
  const appUrl = `http://localhost:3000/reserva/cancelar/${appointments[0].idApp}`;
  const branch = appointments[0]?.sucursal;
  const user = appointments[0].user;
  const createdAt = new Date(appointments[0].createdAt);
  const day = `${createdAt.getDate()}/${
    createdAt.getMonth() + 1
  }/${createdAt.getFullYear()}`;
  const hour = `${createdAt.getHours()}:${createdAt.getMinutes()}`;
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const handlePdf = () => {
    pdfMake.createPdf(docDefinition).download("archivo.pdf");
  };
  const docDefinition = {
    pageSize: "A4",
    pageOrientation: "portrait",
    content: [
      {
        text: `TURNO RESERVADO CON EXITO`,
        style: "header",
      },
      {
        text: `
      RESERVA: ${appointments[0].idApp}`,
        style: "title",
      },
      {
        text: `Hecho el ${day} a las ${hour} para el ${appointments[0].date} a las ${appointments[0].timeOfAppoinment} hs
               Si deseas cancelar el turno entra a la app o escanea el siguiente codigo
               
               `,
        style: "text",
      },
      {
        qr: `${appUrl}`,
        foreground: "#505050",
        alignment: "center",
        background: "#f0f0f0",
      },
      {
        text: `

        Nombre: ${user.name}
        Sucursal: ${branch.name}
        Horario: ${appointments[0].timeOfAppoinment}
        `,
        style: "title",
      },
      {
        text: `Por favor, se ruega puntualidad`,
        style: "text",
      },
      {
        text: "¡MUCHAS GRACIAS POR CONFIAR EN NUESTRO SERVICIO!",
        style: "header",
        fontSize: 14,
      },
    ],

    styles: {
      header: {
        fontSize: 20,
        bold: true,
        color: "#a442f1",
        italics: true,
        alignment: "center",
        width: 350,
      },
      title: {
        fontSize: 16,
        bold: true,
        color: "black",
        italics: true,
        alignment: "center",
      },
      text: {
        fontSize: 12,
        bold: true,
        color: "#505050",
        italics: true,
        alignment: "center",
      },
    },
    pageMargins: [40, 170, 40, 60],
    background: {
      canvas: [
        {
          type: "rect",
          x: 100,
          y: 140,
          w: 400,
          h: 475,
          lineWidth: 1,
          lineColor: "#f0f0f0",
          color: "#f0f0f0",
        },
      ],
    },
  };
  return (
    <div className="container-confirmation">
      <div className="container-confirmation-center">
        <BsCheckSquare className="icon" />
        <h1>¡Gracias por tu reserva!</h1>
        <p>
          Dentro de los siguientes minutos, recibiras un correo electronico en{" "}
          <b>{user.email} </b>
          con todos los detalles de tu reservacion.
          <br />
          Recorda revisar tu buzon de correo no deseado o promociones
        </p>
        <button className="btn-primary" onClick={handlePdf}>
          ¿Querés imprimir tu comprobante?
        </button>
      </div>
      <hr></hr>
      <div>
        <div className="container-confirmation-flex ">
          <div className="margin">
            <div className="number">
              <h2>Reserva</h2>
              <h2 style={{ color: "#a442f1", marginLeft: "5px" }}>
                {" "}
                #{appointments[0].idApp}
              </h2>
            </div>
            <p>
              Hecho el {day} a las {hour} para el {appointments[0].date} a las{" "}
              {appointments[0].timeOfAppoinment} hs
            </p>
          </div>
          <div>
            <button className="button btn-secondary a">
              <AiOutlineTool className="icon" />
              <Link
                href={`/reserva/editar/${appointments[0].idApp}`}
                className="a"
              >
                Editar reserva
              </Link>
            </button>
            <button
              className="button btn-quaternary"
              style={{ textDecoration: "none", color: "#e53939" }}
            >
              <AiOutlineClose className="icon" />
              <Link
                href={`/reserva/cancelar/${appointments[0].idApp}`}
                className="link"
              >
                Cancelar reserva
              </Link>
            </button>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            className="data
            "
          >
            <h3>{user.name}</h3>
            <p>Mail: {user.email}</p>
            <p>Telefono: {user.phone}</p>
          </div>
          <div className="data ">
            <h3>Reserva</h3>
            <p>Sucursal: {branch.name} </p>
            <p>Horario: {appointments[0].timeOfAppoinment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
