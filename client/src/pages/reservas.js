import Appoinments from "@/components/Appoinments/Appoinments";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";

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
      `http://localhost:3001/api/appointments/token?token=${token.user}`
    );
    const data = await response.json();
    return {
      props: {
        branches: data,
      },
    };
  }
}

export default function Register({ branches }) {
  return <Appoinments branches={branches} />;
}
