import Footer from "@/components/Footer";
import React, { type FormEvent, useState } from "react";
import arrow from "@/assets/clarity-arrow-line.svg";
import search from "@/assets/mdi-magnify.svg";
import spend from "@/assets/family-values-friends-big.png";
import group from "@/assets/family-values-friends.png";
import pin from "@/assets/eva-pin-outline.svg";
import food from "@/assets/fluent-food-24-regular.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { type InferGetServerSidePropsType } from "next";
import { db } from "@/utils/db";
import { CldImage } from "next-cloudinary";
import { useSession } from "next-auth/react";

export const getServerSideProps = async () => {
  const groups = await db.group.findMany();
  return {
    props: {
      groups,
    },
  };
};

const New = ({
  groups,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const session = useSession();
  const [form, setForm] = useState({
    type: "food",
    date: new Date().toDateString(),
    amount: 0,
    group: groups[0]!,
    split: "payEqually",
    title: "",
    description: "",
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // const form = req.body as {
    //   type: string;
    //   date: string;
    //   amount: number;
    //   group: {
    //     id: string;
    //     name: string;
    //     icon: string;
    //     description: string | null;
    //     usersIDs: string[];
    //   };
    //   split: string;
    //   title: string;
    //   description: string;
    // };
    const data = {
      type: form.type,
      date: form.date,
      amount: form.amount,
      groupId: form.group.id,
      splitType: form.split,
      title: form.title,
      description: form.description,
      groupName: form.group.name,
    };
    await fetch("/api/spend/new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(form);
  }

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
        <h2 className="font-lato text-base ">
          <span className="font-bold">Spending with: </span>
          <span>{form.group?.name}</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <CldImage
              width={144}
              className="h-36 w-36 rounded-xl bg-primary object-contain"
              height={144}
              alt=""
              src={form.group?.icon ?? ""}
            />
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="type">Type: </label>
                <select
                  name="type"
                  id="type"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-[120px] rounded-lg bg-other p-2 font-bold shadow-md"
                >
                  <option value="food">Food</option>
                  <option value="travel">Travel</option>
                  <option value="rent">Rent</option>
                  <option value="electric">Electric Bill</option>
                  <option value="water">Water Bill</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="date">Date: </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => {
                    setForm({ ...form, date: e.target.value });
                  }}
                  className="w-[120px] rounded-lg bg-other p-2 font-bold shadow-md"
                  name="date"
                  id="date"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="amount">Amount: </label>
                <input
                  type="number"
                  name="amount"
                  min={0}
                  value={form.amount}
                  onChange={(e) => {
                    setForm({ ...form, amount: Number(e.target.value) });
                  }}
                  className="w-[120px] rounded-lg bg-other p-2 font-bold shadow-md"
                  id="amount"
                />
              </div>
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="type">Group: </label>
                <select
                  name="type"
                  id="type"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      group: groups.find(
                        (group) => group.id === e.target.value,
                      )!,
                    });
                  }}
                  value={form.group?.id}
                  className="w-[120px] rounded-lg bg-other p-2 font-bold shadow-md"
                >
                  {groups.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div>
            <label className="font-lato font-bold" htmlFor="split">
              Split:
            </label>
            <select
              className="mt-2 w-full rounded-md bg-other px-2 py-1 text-center"
              name="split"
              id="split"
              value={form.split}
              onChange={(e) => setForm({ ...form, split: e.target.value })}
            >
              <option value="payEqually">
                {form.group.name} members will pay equally.
              </option>
              <option value="payForEveryone">A member will pay in full</option>
              <option value="payFor">
                A member will pay for another member
              </option>
              <option value="payByYourself">
                {form.group.name} members will pay for their own items.
              </option>
              <option value="payPercentage">
                {form.group.name} members will pay in percentage.
              </option>
            </select>
          </div>
          <div>
            <label className="font-lato font-bold" htmlFor="title">
              Expenditure Title:
            </label>
            <input
              className="mt-2 w-full rounded-md bg-other px-2 py-1"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter title"
              name="title"
              id="title"
            />
          </div>
          <div>
            <label className="font-lato font-bold" htmlFor="description">
              Expenditure Description:
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
              }}
              className="mt-2 w-full rounded-md bg-other px-2 py-1"
              id="description"
              placeholder="Enter title"
              cols={30}
              rows={5}
            ></textarea>
          </div>
          <Link
            href="/spending/request"
            className="mt-4 flex w-full items-center justify-center rounded-md bg-secondary py-2 text-white"
          >
            <span className="font-lato text-sm font-bold">Next</span>
          </Link>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default New;
