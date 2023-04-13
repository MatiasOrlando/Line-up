import { Inter } from "next/font/google";
import FormLogin from "@/components/FormLogin/FormLogin";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { secret } = router.query;
  return <FormLogin secret={secret} />;
}
