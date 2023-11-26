import Footer from "@/components/Footer";
import React from "react";
import arrow from "@/assets/clarity-arrow-line.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { db } from "@/utils/db";
import { type InferGetServerSidePropsType } from "next";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

export const getServerSideProps = async () => {
  const communities = await db.community.findMany();
  return {
    props: {
      communities,
    },
  };
};
const Communities = ({
  communities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  console.log(communities);
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
          {communities.map((community) => (
            <Link
              key={community.id}
              className="relative bottom-0 flex h-32 w-80 flex-col items-center  justify-evenly rounded-xl border bg-primary transition-all hover:bottom-2 hover:rotate-2 hover:scale-105"
              href={`/communities/${community.id}`}
            >
              <CldImage
                width={320}
                className="h-32 w-80 object-contain"
                height={128}
                alt=""
                src={community.icon}
              />
              <p className="absolute bottom-2 font-lato font-bold text-white shadow-md drop-shadow-md">
                {community.name}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Communities;
