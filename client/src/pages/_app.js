import "../buildStyles/app.css";
import "typeface-roboto";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header/Header";
import Message from "@/components/PromotionalMessage/Message";

export default function App({ Component, pageProps, router }) {
  const hideHeader = router.pathname === "/register";
  return (
    <SessionProvider session={pageProps.session}>
      <div>
        <Message />
        {!hideHeader && <Header />}
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
