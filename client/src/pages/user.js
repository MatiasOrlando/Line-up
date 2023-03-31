import FormUserData from "@/components/FormUseData/FormUserData";

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

const user = () => {
  return <FormUserData />;
};

export default user;
