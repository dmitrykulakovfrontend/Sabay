import Footer from "@/components/Footer";
import React, { type FormEvent, useState } from "react";
import arrow from "@/assets/clarity-arrow-line.svg";
import avatar1 from "@/assets/friendly-ones-avatar-1.png";
import avatar2 from "@/assets/friendly-ones-avatar-2.png";
import avatar3 from "@/assets/friendly-ones-avatar-3.png";
import avatar4 from "@/assets/people-of-brooklyn-relaxing.png";
import checkmark from "@/assets/checkmark.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Calculate = () => {
  const router = useRouter();
  return (
    <div className="mb-[80px] flex min-h-[calc(100vh_-_80px)] w-full flex-col bg-other">
      <header className="relative flex w-full justify-center p-4">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => router.push("/home")}
        >
          <Image src={arrow as string} width={35} height={35} alt="" />
        </button>
        <h1 className="font-lato text-3xl font-bold uppercase">Spend</h1>
      </header>
      <main className=" flex flex-1 flex-col gap-4 bg-white p-4">
        <h1>[Group Name's] expense on [Expenditure Title]</h1>
        <Link
          href="../home"
          className="mt-4 flex w-full items-center justify-center rounded-md bg-secondary py-2 text-white"
        >
          <span className="font-lato text-sm font-bold">Send Request</span>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default Calculate;
