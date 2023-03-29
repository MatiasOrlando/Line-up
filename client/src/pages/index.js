import { Inter } from "next/font/google";
import FormLogin from "@/components/FormLogin/FormLogin";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <FormLogin />;
}
