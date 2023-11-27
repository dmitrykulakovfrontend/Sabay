import React, { useState } from "react";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { db } from "@/utils/db";
import { type ParsedUrlQuery } from "querystring";
import { CldImage } from "next-cloudinary";

import userIcon from "@/assets/friendly-ones-avatar.png";
import arrow from "@/assets/clarity-arrow-line.svg";
import electricity from "@/assets/akar-icons-thunder.svg";
import water from "@/assets/ic-outline-water-drop.svg";
import house from "@/assets/ph-house-bold.svg";
import food from "@/assets/fluent-food-24-regular.svg";
import travel from "@/assets/material-symbols-travel.svg";
import Modal from "react-modal";
import dots from "@/assets/tabler-dots.svg";
import edit from "@/assets/pepicons-pop-pen.svg";
import invite from "@/assets/mingcute-invite-fill.svg";

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<Params>,
) => {
  if (!ctx.params?.id) {
    return {
      notFound: true,
    };
  }
  const { id } = ctx.params;
  const group = await db.group.findFirst({
    where: {
      id,
    },
    include: {
      users: true,
    },
  });
  if (!group) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      group,
    },
  };
};

const Group = ({
  group,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const transactions = [
    {
      name: "Electric Bills",
      amount: 1000,
      icon: electricity as string,
    },
    {
      name: "Water Bills",
      amount: 3000,
      icon: water as string,
    },
    {
      name: "Rent",
      amount: 9000,
      icon: house as string,
    },
    {
      name: "Food",
      amount: 3000,
      icon: food as string,
    },
    {
      name: "Travel",
      amount: 10000,
      icon: travel as string,
    },
    {
      name: "Food",
      amount: 3000,
      icon: food as string,
    },
    {
      name: "Food",
      amount: 3000,
      icon: food as string,
    },
    {
      name: "Food",
      amount: 3000,
      icon: food as string,
    },
  ];
  const summary = transactions
    .reduce(
      (acc, curr) => {
        const group = acc.find((i) => i.icon === curr.icon);
        if (group) {
          group.amount += curr.amount;
        } else {
          acc.push({
            ...curr,
          });
        }
        return acc;
      },
      [] as {
        name: string;
        amount: number;
        icon: string;
      }[],
    )
    .sort((a, b) => b.amount - a.amount);
  async function handleInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await fetch("/api/groups/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        groupId: group.id,
        groupName: group.name,
      }),
    });
    setEmail("");
    setIsOpen(false);
  }
  console.log(modalIsOpen);
  return (
    <div className="min-h-screen  w-full p-4">
      <header className="relative flex w-full justify-center">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => router.push("/home")}
        >
          <Image src={arrow as string} width={35} height={35} alt="" />
        </button>
        <h1 className="font-lato text-3xl font-bold uppercase">Groups</h1>
      </header>
      <main className="my-4 flex flex-col gap-4">
        <Link href={"/transactions"}>
          <p className="my-4 font-merriweather text-2xl uppercase">
            {group.name}
          </p>
          <CldImage
            width={320}
            className="h-36 w-80 rounded-xl bg-primary object-contain"
            height={144}
            alt=""
            src={group.icon}
          />
        </Link>
        <div>
          <div className="mb-4 flex  justify-between pr-4">
            <p className="font-merriweather text-2xl">Members:</p>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center gap-4 font-merriweather text-xs font-bold italic underline underline-offset-1"
            >
              add members{" "}
              <Image
                src={edit as string}
                alt=""
                width={17}
                height={17}
                className="h-fit"
              />
            </button>
            <Modal
              overlayClassName="fixed inset-0 bg-transparent"
              isOpen={modalIsOpen}
              shouldCloseOnOverlayClick={true}
              onRequestClose={() => setIsOpen(false)}
              contentLabel="Add members"
              className="absolute left-1/2 top-1/2 h-fit w-full max-w-xs -translate-x-1/2 -translate-y-1/2"
            >
              <form
                className="flex flex-col gap-2 rounded-lg bg-gradient-to-b from-secondary to-other p-5 font-lato text-white"
                onSubmit={handleInvite}
              >
                <h2 className="text-center text-2xl font-bold uppercase">
                  Add members
                </h2>
                <div className="flex items-end justify-between">
                  <p className="text-xl font-bold uppercase">Add members:</p>
                  <button className="font-bold underline underline-offset-1 ">
                    by email
                  </button>
                </div>
                <div className="relative w-full">
                  <input
                    className="w-full rounded-md px-4 py-2 text-black underline underline-offset-2"
                    type="email"
                    name="email"
                    placeholder="@gmail.com"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    alt=""
                    width={20}
                    height={20}
                    src={invite as string}
                  />
                </div>
                <button className="mx-auto w-fit rounded-md bg-primary  px-16 py-2 font-bold uppercase text-secondary">
                  Add
                </button>
              </form>
            </Modal>
          </div>
          <ul className="mb-4 flex flex-col gap-2">
            {group.users.map((user) => (
              <li key={user.id} className="flex items-center gap-2">
                <Image
                  src={user.image ?? userIcon}
                  width={40}
                  className="h-10 w-10 rounded-full"
                  height={40}
                  alt=""
                />
                <p>{user.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <h2 className="font-merriweather text-2xl">Transaction History</h2>
        <ul className="flex flex-col">
          {transactions.map(({ amount, icon, name }, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-2 border-2 border-black p-2 odd:bg-[#EBEBEB] even:bg-[#BEBEBE]"
            >
              <div className="flex items-center gap-2">
                <Image
                  className="h-8 w-8 rounded-full bg-[#D9D9D9] p-1"
                  alt=""
                  width={32}
                  height={32}
                  src={icon}
                />
                <div className="flex flex-col gap-0">
                  <p className="font-merriweather text-base font-bold leading-none">
                    {name}
                  </p>
                  <time className="font-merriweather text-xs leading-none">
                    Date and time
                  </time>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p>P{amount}</p>
                <button>
                  <Image width={23} height={23} alt="" src={dots as string} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h2 className="font-merriweather text-2xl">Summary</h2>
        <table>
          <thead className="bg-[#BEBEBE] text-center font-merriweather uppercase">
            <tr>
              <th>Category</th>
              <th>Expense</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {summary.map(({ amount, icon, name }, i) => (
              <tr
                key={i}
                className=" font-merriweather text-xs odd:bg-white even:bg-[#BEBEBE]"
              >
                <td className="flex items-center  gap-2 py-2">
                  <Image
                    className=""
                    alt=""
                    width={25}
                    height={25}
                    src={icon}
                  />
                  <p>{name}</p>
                </td>
                <td>P{amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
};

export default Group;
