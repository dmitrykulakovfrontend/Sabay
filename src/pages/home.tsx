import React, { useState } from "react";
import Image from "next/image";
import menu from "@/assets/mingcute-menu-fill.svg";
import search from "@/assets/mdi-magnify.svg";
import add from "@/assets/add.png";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  type InferGetServerSidePropsType,
  type GetServerSideProps,
} from "next";
import { db } from "@/utils/db";
import { CldImage } from "next-cloudinary";

export const getServerSideProps = async () => {
  const groups = await db.group.findMany();
  const communities = await db.community.findMany();
  return {
    props: {
      groups,
      communities,
    },
  };
};

const Home = ({
  groups,
  communities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isCommunities, setCommunities] = useState(false);
  return (
    <div className="mb-[80px] flex min-h-[calc(100vh_-_80px)] w-full flex-col gap-8 px-4">
      <div>
        <header className="flex gap-6">
          <button>
            <Image width={30} height={30} src={menu as string} alt="Menu" />
          </button>
          <div className="relative flex-1 rounded-md py-2">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              className="w-full rounded-md bg-zinc-300 py-2"
              type="text"
              id="search"
            />
            <Image
              className="absolute right-2 top-1/2 -translate-y-1/2"
              width={30}
              height={30}
              src={search as string}
              alt="Search"
            />
          </div>
        </header>
        <div className=" mt-8 flex justify-around font-merriweather text-lg">
          <button
            onClick={() => setCommunities(false)}
            className={` relative uppercase ${
              isCommunities ? "" : "font-bold"
            }`}
          >
            Your groups
            {!isCommunities && (
              <div className="absolute bottom-0 left-1/2 h-1 w-1/2 -translate-x-1/2 bg-black"></div>
            )}
          </button>
          <button
            onClick={() => setCommunities(true)}
            className={` relative uppercase ${
              !isCommunities ? "" : "font-bold"
            }`}
          >
            Communities
            {isCommunities && (
              <div className="absolute bottom-0 left-1/2 h-1 w-1/2 -translate-x-1/2 bg-black"></div>
            )}
          </button>
        </div>
      </div>
      <div>
        {isCommunities ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={"/communities/new"}
              className="flex h-32 w-80 flex-col items-center  justify-evenly rounded-xl font-merriweather"
            >
              <Image width={70} height={70} src={add} alt="Add" />
              <p>Create Community</p>
            </Link>
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
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href={"/groups/new"}
              className="flex h-32 w-32 flex-col items-center justify-evenly rounded-xl  font-merriweather "
            >
              <Image width={70} height={70} src={add} alt="Add" />
              <p>Create Group</p>
            </Link>
            {groups.map((group) => (
              <Link
                key={group.id}
                className="relative bottom-0 flex h-32 w-32 flex-col items-center justify-center rounded-xl border bg-primary transition-all hover:bottom-2 hover:rotate-2 hover:scale-105"
                href={`/groups/${group.id}`}
              >
                <CldImage
                  className=" h-32 w-32 rounded-xl"
                  width={128}
                  height={128}
                  alt=""
                  src={group.icon}
                />
                <p className="absolute bottom-2 font-lato font-bold text-white drop-shadow-md">
                  {group.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
