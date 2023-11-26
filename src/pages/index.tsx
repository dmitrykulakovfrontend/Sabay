import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import logoSrc from "@/assets/logo.png";

export default function Index() {
  const { data: sessionData } = useSession();

  return (
    <div className="bg-primary flex min-h-screen w-full flex-col items-center justify-center gap-12 p-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src={logoSrc} width={100} height={200} alt="" />
        <h1 className="font-lato  text-4xl font-bold uppercase">Sabay</h1>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        {sessionData && (
          <button
            className="w-full max-w-sm rounded-3xl bg-zinc-300 py-2  font-merriweather text-xl uppercase"
            onClick={() => signOut()}
          >
            Signout
          </button>
        )}
        {!sessionData && (
          <>
            <button
              className="bg-secondary w-full max-w-sm  rounded-3xl py-2 font-merriweather  text-xl uppercase text-white"
              onClick={() => signIn()}
            >
              Signup
            </button>
            <button
              className="bg-secondary w-full max-w-sm  rounded-3xl py-2 font-merriweather  text-xl uppercase text-white"
              onClick={() => signIn()}
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
