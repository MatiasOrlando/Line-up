import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import FormCancel from "@/components/FormCancel/FormCancel";
import InfoReservation from "@/components/InfoReservation/InfoReservation";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.query;

  const token = await getSession(context);

  if (!token.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const response = await fetch(
      `http://localhost:3001/api/user/validate/token?token=${token.user}`
    );
    const data = await response.json();

    const appointments = await fetch(
      `http://localhost:3001/api/appointments/${id}/token?token=${token.user}`
    );
    const userAppointment = await appointments.json();

    return {
      props: {
        user: data,
        token: token,
        appointment: userAppointment[0],
        id: id,
      },
    };
  }
}

const cancel = ({ user, token, id, appointment }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <div className="container-go-back">
            <Link href="/reserva/confirmacion" className="go-back">
              <AiOutlineArrowLeft className="icon" /> Atrás
            </Link>
          </div>
          <div className="container-title">
            <p>Cancelar reserva</p>
          </div>
          <FormCancel user={user} token={token} idApp={id} />
        </div>
        <div>
          <InfoReservation user={user} appointment={appointment} />
        </div>
      </div>
    </>
  );
};

export default cancel;
