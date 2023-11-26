import React, { useState } from "react";
import Footer from "@/components/Footer";
import arrow from "@/assets/clarity-arrow-line.svg";
import userIcon from "@/assets/friendly-ones-avatar.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import electricity from "@/assets/akar-icons-thunder.svg";
import water from "@/assets/ic-outline-water-drop.svg";
import house from "@/assets/ph-house-bold.svg";
import food from "@/assets/fluent-food-24-regular.svg";
import travel from "@/assets/material-symbols-travel.svg";
import dots from "@/assets/tabler-dots.svg";
import {
  type GetServerSidePropsContext,
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import communities from "@/assets/family-values-friends.png";
import { db } from "@/utils/db";
import { type ParsedUrlQuery } from "querystring";
import { CldImage } from "next-cloudinary";

// type idUrl = ParsedUrlQuery & {
//   id: string;
// };

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
  const communities = await db.community.findFirst({
    where: {
      id,
    },
    include: {
      users: true,
    },
  });
  if (!communities) {
    return {
      notFound: true,
    };
  }
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
  const [email, setEmail] = useState("");
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
        const communities = acc.find((i) => i.icon === curr.icon);
        if (communities) {
          communities.amount += curr.amount;
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
    await fetch("/api/communitiess/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        communitiesId: communities.id,
        communitiesName: communities.name,
      }),
    });
    setEmail("");
  }
  return (
    <div className="min-h-screen  w-full p-4">
      <header className="relative flex w-full justify-center">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => router.push("/home")}
        >
          <Image src={arrow as string} width={35} height={35} alt="" />
        </button>
        <h1 className="font-lato text-3xl font-bold uppercase">Communitiess</h1>
      </header>
      <main className="my-4 flex flex-col gap-4">
        <div>
          <form
            onSubmit={handleInvite}
            className="flex flex-col items-center justify-between gap-4"
          >
            <label htmlFor="email">Add members: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className=" w-full rounded-lg bg-other p-2 font-bold shadow-md"
              name="email"
              placeholder="@gmail.com"
              id="email"
            />
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center rounded-md bg-secondary py-2 text-white"
            >
              Invite
            </button>
          </form>
        </div>
        <Link href={"/transactions"}>
          <p className="my-4 font-merriweather text-2xl uppercase">
            {communities.name}
          </p>
          <CldImage
            width={320}
            className="h-36 w-80 rounded-xl bg-primary object-contain"
            height={144}
            alt=""
            src={communities.icon}
          />
        </Link>
        <div>
          <p className="mb-4 font-merriweather text-2xl">Members:</p>
          <ul className="mb-4 flex flex-col gap-2">
            {communities.users.map((user) => (
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

export default Communities;
