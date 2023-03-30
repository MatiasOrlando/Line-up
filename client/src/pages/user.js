import FormUserData from "@/components/FormUseData/FormUserData";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const user = () => {
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!data && router.pathname !== "/") {
      router.push("/");
    }
  }, [data, router]);

  return (
    <div>
      <FormUserData />
    </div>
  );
};

export default user;
