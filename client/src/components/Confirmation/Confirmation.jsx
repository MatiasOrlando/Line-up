import React from "react";
import { BsCheckSquare } from "react-icons/bs";
import { AiOutlineTool } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Link from "next/link";

const Confirmation = () => {
  const num = "#1043812955480-01";
  const email = "asdasd@gmail.com";
  const appUrl = "http://localhost:3000/reserva/confirmacion";

  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const handlePdf = () => {
    pdfMake.createPdf(docDefinition).download("archivo.pdf");
  };

  const docDefinition = {
    pageSize: "A4",
    pageOrientation: "portrait",
    content: [
      {
        text: `TURNO CONFIRMADO`,
        style: "header",
      },
      {
        text: `
      RESERVA: ${num}`,
        style: "title",
      },
      {
        text: `Hecho el 10/10/2022 a las 11:35 para el 12/10/2022 a las 13:00 hs
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

        Nombre: Ivan Cruce
        Sucursal: Villa Crespo
        Horario: 13:00 hs
        `,
        style: "title",
      },
      {
        text: `Por favor, se ruega puntualidad`,
        style: "text",
      },
      {
        text: "¡MUCHAS GRACIAS POR CONFIAR EN NOSOTROS!",
        style: "header",
        fontSize: 16,
      },
    ],

    styles: {
      header: {
        fontSize: 22,
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
          lineColor: "#000000",
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
          En hasta 4 minutos, recibiras un correo electronico en {email} con
          todos los detalles de tu reservacion.
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
              <h2>{num}</h2>
            </div>
            <p>
              Hecho el 10/10/2022 a las 11:35 para el 12/10/2022 a las 13:00 hs
            </p>
          </div>
          <div>
            <button className="button btn-secondary">
              <AiOutlineTool className="icon" /> Editar reserva
            </button>
            <button className="button btn-quaternary">
              <AiOutlineClose className="icon" />
              <Link href={"/cancelar"} className="link">
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
            <h3>Ivan Cruce</h3>
            <p>Mail: ivancruce@gmail.com</p>
            <p>Telefono: 21321348</p>
          </div>
          <div className="data ">
            <h3>Reserva</h3>
            <p>Sucursal: Villa Crespo</p>
            <p>Horario: 13:00 hs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
