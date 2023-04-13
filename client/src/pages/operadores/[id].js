import ListOperators from "@/components/ListOperators/ListOperators";
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
            `http://localhost:3001/api/admin/get-all-operators/${pagination}/token?token=${token.user}`
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
                dataOperadores: data.data,
                length: data.length,
                /* pagination: pagination, */
            },
        };
    }
}

export default function Operators({ dataOperadores, length }) {

    return < ListOperators dataOperadores={dataOperadores} length={length} />;
}
