import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Merriweather, Lato } from "next/font/google";
const merriweather = Merriweather({
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-merriweather",
  weight: ["300", "400", "700", "900"],
});

const lato = Lato({
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-lato",
  weight: ["300", "100", "400", "700", "900"],
});
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div
        className={`${lato.variable} ${merriweather.variable} font-lato flex min-h-screen flex-col items-center justify-center`}
      >
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
