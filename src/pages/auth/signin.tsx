import { authOptions } from "@/server/auth";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { getServerSession } from "next-auth";
import { signIn, getProviders } from "next-auth/react";
import Image from "next/image";
import logoSrc from "@/assets/logo.png";
import googleSrc from "@/assets/login-ph-google-logo-fill.svg";
import React from "react";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center gap-12 p-8">
      <div className="font-merriweather flex flex-col items-center justify-center gap-2">
        <Image src={logoSrc} width={100} height={200} alt="" />
      </div>
      <div>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              onClick={() =>
                signIn(provider.id, {
                  callbackUrl: "/features",
                })
              }
              className="font-merriweather flex w-full gap-2 rounded-3xl  border border-slate-200 bg-zinc-300  px-4 py-2  text-xl uppercase text-black transition duration-150  hover:border-slate-400 hover:text-slate-900 hover:shadow"
            >
              <Image src={googleSrc as string} width={24} height={24} alt="" />
              <span className="uppercase">{provider.name}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
