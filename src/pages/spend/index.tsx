import Footer from "@/components/Footer";
import React from "react";
import arrow from "@/assets/clarity-arrow-line.svg";
import search from "@/assets/mdi-magnify.svg";
import favorite from "@/assets/favorite.png";
import group from "@/assets/family-values-friends.png";
import pin from "@/assets/eva-pin-outline.svg";
import food from "@/assets/fluent-food-24-regular.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
const Spend = () => {
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
        <h1 className="font-lato text-3xl font-bold uppercase">Spend</h1>
      </header>
      <main className="my-4 flex flex-col gap-4">
        <button className="flex w-full items-center justify-center rounded-full border-2 border-black py-2">
          <Image width={30} height={30} alt="" src={search as string} />{" "}
          <span className="font-merriweather text-sm font-bold">Search</span>
        </button>
        <h2 className="font-lato text-base font-bold uppercase">Favorites</h2>
        <div className="flex flex-wrap gap-2">
          <Link href={"/spend/new"}>
            <Image
              className="rounded-3xl bg-zinc-300 shadow-md drop-shadow-md"
              width={80}
              height={80}
              alt=""
              src={favorite}
            />
          </Link>
          <Link href={"/spend/new"}>
            <Image
              className="rounded-3xl bg-zinc-300 shadow-md drop-shadow-md"
              width={80}
              height={80}
              alt=""
              src={favorite}
            />
          </Link>
          <Link href={"/spend/new"}>
            <Image
              className="rounded-3xl bg-zinc-300 shadow-md drop-shadow-md"
              width={80}
              height={80}
              alt=""
              src={favorite}
            />
          </Link>
        </div>
        <h2 className="font-lato text-base font-bold uppercase">Recents</h2>
        <div className="flex flex-col gap-4">
          <Link href={"/spend/new"} className="flex justify-start gap-2">
            <Image
              className="h-16 w-16"
              width={60}
              height={60}
              alt=""
              src={group}
            />
            <div className="flex flex-col gap-1">
              <p className="flex gap-2">
                <span className="font-lato text-sm font-bold">
                  [Group Name]
                </span>
                <span className="flex items-center gap-1 font-lato text-xs">
                  <Image width={15} height={15} alt="" src={pin as string} />
                  Gastambide
                </span>
              </p>
              <p className="font-lato text-sm">
                Group Description - group na lagi nagsisig sa gastam
              </p>
            </div>
            <div className="flex flex-col items-end justify-between gap-2">
              <Image width={22} height={22} alt="" src={food as string} />
              <p className=" font-lato text-sm font-bold">Р555.00</p>
            </div>
          </Link>
          <Link href={"/spend/new"} className="flex justify-start gap-2">
            <Image
              className="h-16 w-16"
              width={60}
              height={60}
              alt=""
              src={group}
            />
            <div className="flex flex-col gap-1">
              <p className="flex gap-2">
                <span className="font-lato text-sm font-bold">
                  [Group Name]
                </span>
                <span className="flex items-center gap-1 font-lato text-xs">
                  <Image width={15} height={15} alt="" src={pin as string} />
                  SM Manila
                </span>
              </p>
              <p className="font-lato text-sm">
                Group Description - group na nag chuchooks lagi
              </p>
            </div>
            <div className="flex flex-col items-end justify-between gap-2">
              <Image width={22} height={22} alt="" src={food as string} />
              <p className=" font-lato text-sm font-bold">Р968.00</p>
            </div>
          </Link>
        </div>
        <h2 className="font-lato text-base font-bold uppercase">Your groups</h2>
        <div className="flex flex-col gap-1">
          <div className="flex justify-start gap-2">
            <Image
              width={40}
              height={40}
              alt=""
              src={favorite}
              className="rounded-xl bg-zinc-300"
            />
            <div className="flex flex-col">
              <p className="font-lato text-sm font-bold">[Group Name]</p>
              <p className="font-lato text-xs">
                Group Description. This group is blahblah this that
              </p>
            </div>
          </div>
          <Link href={"/spend/new"} className="flex justify-start gap-2">
            <Image
              width={40}
              height={40}
              alt=""
              src={favorite}
              className="rounded-xl bg-zinc-300"
            />
            <div className="flex flex-col">
              <p className="font-lato text-sm font-bold">[Group Name]</p>
              <p className="font-lato text-xs">
                Group Description. This group is blahblah this that
              </p>
            </div>
          </Link>
          <Link href={"/spend/new"} className="flex justify-start gap-2">
            <Image
              width={40}
              height={40}
              alt=""
              src={favorite}
              className="rounded-xl bg-zinc-300"
            />
            <div className="flex flex-col">
              <p className="font-lato text-sm font-bold">[Group Name]</p>
              <p className="font-lato text-xs">
                Group Description. This group is blahblah this that
              </p>
            </div>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Spend;
