import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import FormCancel from "@/components/FormCancel/FormCancel";
import InfoReservation from "@/components/InfoReservation/InfoReservation";

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  if (!sessionToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

const cancel = () => {
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
          <FormCancel />
        </div>
        <div>
          <InfoReservation />
        </div>
      </div>
    </>
  );
};

export default cancel;
