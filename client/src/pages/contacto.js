export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3001/api/user/all-users");
  const data = await response.json();
  return {
    props: {
      branches: data,
    },
  };
};

const contacto = ({ branches }) => {
  console.log(branches);
  return <div>Contacto</div>;
};

export default contacto;
