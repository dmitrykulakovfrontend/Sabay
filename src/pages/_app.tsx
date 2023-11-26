import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import "@/styles/globals.css";
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
        className={`${lato.variable} ${merriweather.variable} flex min-h-screen w-full flex-col items-center justify-center font-lato`}
      >
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default MyApp;
