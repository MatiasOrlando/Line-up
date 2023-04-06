import ListAppoinments from "@/components/ListAppoinments/ListAppoinments";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const token = await getSession(context);
  const pagination = context.params.id;

  if (!token.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    const response = await fetch(
      `http://localhost:3001/api/operator/appointment/${pagination}/token?token=${token.user}`
    );

    const data = await response.json();

    if (pagination > Math.ceil(data.length / 7)) {
      return {
        redirect: {
          destination: "/operadorReservas/1",
          permanent: false,
        },
      };
    }

    return {
      props: {
        branches: data.data,
        length: data.length,
        pagination: pagination,
      },
    };
  }
}

export default function Register({ branches, length }) {
  return <ListAppoinments branches={branches} length={length} />;
}
