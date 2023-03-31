import Appoinments from "@/components/Appoinments/Appoinments";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Register() {
    const { data } = useSession();
    const router = useRouter();
    useEffect(() => {
        if (!data && router.pathname !== "/") {
            router.push("/");
        }
    }, [data, router]);

    return <Appoinments />;
}
