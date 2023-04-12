import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import FormCancel from "@/components/FormCancel/FormCancel";
import InfoReservation from "@/components/InfoReservation/InfoReservation";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
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
    return {
      props: {
        user: data,
        token: token,
      },
    };
  }
}

const cancel = ({ user, token }) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <div className="container-go-back">
            <Link href="/" className="go-back">
              <AiOutlineArrowLeft className="icon" /> Atrás
            </Link>
          </div>
          <div className="container-title">
            <p>Cancelar reserva</p>
          </div>
          <FormCancel user={user} token={token} />
        </div>
        <div>
          <InfoReservation user={user} />
        </div>
      </div>
    </>
  );
};

export default cancel;
