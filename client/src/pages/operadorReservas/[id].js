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

    if (pagination > Math.ceil(data.length / 7) && data.length > 1) {
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
        token: token,
      },
    };
  }
}

export default function Register({ branches, length, token }) {
  return <ListAppoinments token={token} branches={branches} length={length} />;
}
