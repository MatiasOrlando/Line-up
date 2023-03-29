import "../buildStyles/app.css";
import "typeface-roboto";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header/Header";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
