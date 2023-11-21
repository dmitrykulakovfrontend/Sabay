import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import Image from "next/image";
import logoSrc from "@/assets/logo.png";

export default function Index() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center gap-12 p-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <Image src={logoSrc} width={100} height={200} alt="" />
        <h1 className="font-lato  text-4xl font-bold uppercase">Sabay</h1>
      </div>
      <div className="flex w-full flex-col gap-2">
        {sessionData && (
          <button
            className="font-merriweather w-full rounded-3xl bg-zinc-300  py-2 text-xl uppercase"
            onClick={() => signOut()}
          >
            Signout
          </button>
        )}
        {!sessionData && (
          <>
            <button
              className="font-merriweather w-full rounded-3xl bg-zinc-300  py-2 text-xl uppercase"
              onClick={() => signIn()}
            >
              Signup
            </button>
            <button
              className="font-merriweather w-full rounded-3xl bg-zinc-300  py-2 text-xl uppercase"
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
