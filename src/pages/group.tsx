import React from "react";
import Footer from "../components/Footer";
import arrow from "@/assets/clarity-arrow-line.svg";
import user from "@/assets/friendly-ones-avatar.png";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import electricity from "@/assets/akar-icons-thunder.svg";
import water from "@/assets/ic-outline-water-drop.svg";
import house from "@/assets/ph-house-bold.svg";
import food from "@/assets/fluent-food-24-regular.svg";
import travel from "@/assets/material-symbols-travel.svg";
import dots from "@/assets/tabler-dots.svg";

const Group = () => {
  const router = useRouter();
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
        console.log(acc);
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
  console.log(summary);
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
            Group name
          </p>
          <div className="h-36 w-full rounded-xl bg-zinc-300"></div>
        </Link>
        <div>
          <p className="mb-4 font-merriweather text-2xl">Members:</p>
          <ul className="mb-4 flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <Image src={user} width={40} height={40} alt="" />
              <p>Member 1 Name</p>
            </li>
            <li className="flex items-center gap-2">
              <Image src={user} width={40} height={40} alt="" />
              <p>Member 1 Name</p>
            </li>
            <li className="flex items-center gap-2">
              <Image src={user} width={40} height={40} alt="" />
              <p>Member 1 Name</p>
            </li>
            <li className="flex items-center gap-2">
              <Image src={user} width={40} height={40} alt="" />
              <p>Member 1 Name</p>
            </li>
            <li className="flex items-center gap-2">
              <Image src={user} width={40} height={40} alt="" />
              <p>Member 1 Name</p>
            </li>
            <li className="flex items-center gap-2">
              <Image src={user} width={40} height={40} alt="" />
              <p>Member 1 Name</p>
            </li>
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
