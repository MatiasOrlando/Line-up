import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function useVerification() {
  const [user, setUser] = useState(null);
  const { data } = useSession();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (data && data?.user) {
          const tokenUser = await axios.get(
            `http://localhost:3001/api/user/validate/token?token=${data.user}`
          );
          if (tokenUser) {
            setUser(tokenUser.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [data]);
  return { data, user };
}
