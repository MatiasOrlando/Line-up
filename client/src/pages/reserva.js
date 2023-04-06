import FormReserva from "@/components/FormReserva/reserva";



export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  if (!sessionToken) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const response = await fetch("http://localhost:3001/api/appointments/branches");
    const data = await response.json();
    return {
      props: {
        branches: data,
      },
    };
  }
}

export default function Reserva({ branches }) {
  return <FormReserva branches={branches} />;
}
