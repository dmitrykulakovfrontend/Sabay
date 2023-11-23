import Footer from "@/components/Footer";
import React from "react";
import arrow from "@/assets/clarity-arrow-line.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const Communities = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen  w-full p-4">
      <header className="relative flex w-full justify-center">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => router.push("/home")}
        >
          <Image src={arrow as string} width={35} height={35} alt="" />
        </button>
        <h1 className="font-lato text-3xl font-bold uppercase">Communities</h1>
      </header>
      <main className="my-4 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex h-32 w-80 items-end justify-center rounded-xl bg-zinc-300 pb-8 font-lato font-bold text-white">
            Community Name
          </div>
          <div className="flex h-32 w-80 items-end justify-center rounded-xl bg-zinc-300 pb-8 font-lato font-bold text-white">
            Community Name
          </div>
          <div className="flex h-32 w-80 items-end justify-center rounded-xl bg-zinc-300 pb-8 font-lato font-bold text-white">
            Community Name
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Communities;
