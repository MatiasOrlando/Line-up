import ListBranches from "@/components/ListBranches/ListBranches";
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
      `http://localhost:3001/api/admin/get-all-branches/${pagination}/token?token=${token.user}`
    );
    const data = await response.json();

    if (pagination > Math.ceil(data.length / 7)) {
      return {
        redirect: {
          destination: "/sucursales/1",
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
  return <ListBranches branches={branches} length={length} />;
}
