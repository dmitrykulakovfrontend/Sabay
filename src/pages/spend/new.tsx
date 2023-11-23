import Footer from "@/components/Footer";
import React from "react";
import arrow from "@/assets/clarity-arrow-line.svg";
import search from "@/assets/mdi-magnify.svg";
import spend from "@/assets/family-values-friends-big.png";
import group from "@/assets/family-values-friends.png";
import pin from "@/assets/eva-pin-outline.svg";
import food from "@/assets/fluent-food-24-regular.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
const New = () => {
  const router = useRouter();
  return (
    <div className="mb-[80px] flex min-h-[calc(100vh_-_80px)] w-full flex-col p-4">
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
        <h2 className="font-lato text-base ">
          <span className="font-bold">Spending with: </span>
          <span>[Group Name]</span>
        </h2>
        <form>
          <div className="flex items-center justify-between">
            <Image
              className="h-36 w-36 rounded-3xl bg-zinc-300 "
              width={150}
              height={150}
              alt=""
              src={spend}
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="type">Type: </label>
                <select
                  name="type"
                  id="type"
                  className="w-[100px] rounded-lg bg-zinc-300 p-2 font-bold shadow-md"
                >
                  <option value="food">Food</option>
                  <option value="travel">Travel</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="date">Date: </label>
                <input
                  type="date"
                  className="w-[100px] rounded-lg bg-zinc-300 p-2 font-bold shadow-md"
                  name="date"
                  id="date"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="time">Time: </label>
                <input
                  type="text"
                  placeholder="Enter time"
                  className="w-[100px] rounded-lg bg-zinc-300 p-2 font-bold shadow-md"
                  name="time"
                  id="time"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="amount">Amount: </label>
                <input
                  type="text"
                  name="amount"
                  placeholder="00.00"
                  className="w-[100px] rounded-lg bg-zinc-300 p-2 font-bold shadow-md"
                  id="amount"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="font-lato font-bold" htmlFor="title">
              Spenditure Title:
            </label>
            <input
              className="mt-2 w-full rounded-md bg-zinc-300 px-2 py-1"
              type="text"
              placeholder="Enter title"
              name="title"
              id="title"
            />
          </div>
          <div>
            <label className="font-lato font-bold" htmlFor="description">
              Spenditure Description:
            </label>
            <textarea
              name="description"
              className="mt-2 w-full rounded-md bg-zinc-300 px-2 py-1"
              id="description"
              placeholder="Enter title"
              cols={30}
              rows={10}
            ></textarea>
          </div>
          <button className="mt-4 flex w-full items-center justify-center rounded-md bg-zinc-300 py-2">
            <span className="font-merriweather text-sm font-bold">Submit</span>
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default New;
