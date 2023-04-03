import Appoinments from "@/components/Appoinments/Appoinments";

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

export default function Register() {
  return <Appoinments />;
}
