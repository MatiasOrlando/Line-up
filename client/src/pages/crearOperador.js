import FormNewOperator from "@/components/FormNewOperator/FormNewOperator";
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
      `http://localhost:3001/api/admin/get-enabled-branches/token?token=${token?.user}`
    );
    const data = await response.json();
    return {
      props: {
        branches: data.data,
      },
    };
  }
}
export default function CrearSucursal({ branches }) {
  return <FormNewOperator branches={branches} />;
}
