import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { getServerSession } from "next-auth";
import { signIn, getProviders } from "next-auth/react";
import Image from "next/image";
import logoSrc from "@/assets/logo.png";
import googleSrc from "@/assets/login-ph-google-logo-fill.svg";
import facebookSrc from "@/assets/login-akar-icons-facebook-fill.svg";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getServerAuthSession } from "../api/auth/[...nextauth]";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex min-h-screen  w-full flex-col items-center justify-center gap-12 bg-primary p-8">
      <div className="flex flex-col items-center justify-center gap-4 font-merriweather">
        <Image src={logoSrc} width={100} height={200} alt="" />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void router.push("/features");
        }}
        className="flex w-full flex-col items-center justify-center gap-2"
      >
        <label
          htmlFor="username"
          className="font-merriweather text-lg uppercase"
        >
          Username
        </label>
        <input
          type="text"
          className="w-full max-w-xs border-b-2 border-black bg-primary  p-2 opacity-100"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          id="username"
        />
        <label
          htmlFor="password"
          className=" font-merriweather text-lg uppercase"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="w-full max-w-xs border-b-2 border-black bg-primary p-2"
        />
        <button
          type="submit"
          className="mx-auto mt-8 w-full max-w-xs rounded-3xl bg-secondary py-2 font-merriweather text-xl  uppercase text-white"
        >
          Login
        </button>
      </form>
      <div className="relative">
        <div className="absolute -left-8 top-1/2 h-[2px] w-1/3 -translate-x-1/2 -translate-y-1/2 bg-black"></div>
        <span className=" bg-transparent px-2 font-merriweather uppercase">
          Or connect with
        </span>
        <div className="absolute -right-8 top-1/2 h-[2px] w-1/3 -translate-y-1/2 translate-x-1/2 bg-black"></div>
      </div>
      <div className="flex w-full items-center justify-center gap-4">
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/features",
            })
          }
          className="flex w-full max-w-xs gap-2 rounded-3xl bg-secondary  px-4 py-2  font-merriweather text-xl  uppercase  text-white transition duration-150   hover:shadow"
        >
          <Image src={facebookSrc as string} width={24} height={24} alt="" />
          <span className="text-base uppercase">Facebook</span>
        </button>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/features",
            })
          }
          className="flex w-full max-w-xs gap-2 rounded-3xl bg-secondary px-4 py-2  font-merriweather text-xl  uppercase  text-white transition duration-150  hover:shadow"
        >
          <Image src={googleSrc as string} width={24} height={24} alt="" />
          <span className="text-base uppercase">google</span>
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext) {
  const session = await getServerAuthSession({ req, res });

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
