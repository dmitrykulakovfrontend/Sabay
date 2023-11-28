import Footer from "@/components/Footer";
import React, { useState } from "react";
import arrow from "@/assets/clarity-arrow-line.svg";
import user from "@/assets/user.png";
import Image from "next/image";
import { useRouter } from "next/router";

const MessageType = {
  Inbox: "Inbox",
  Unread: "Unread",
  Sent: "Sent",
  Request: "Request",
  Archive: "Archive",
} as const;
type MessageType = keyof typeof MessageType;

const Chat = () => {
  const router = useRouter();
  const [tab, setTab] = useState<MessageType>("Inbox");
  const messages = [
    {
      username: "Tanya Grifud Ahmed",
      message: "Payment sent. Confirm details. Thanks!",
      amount: 1,
      time: "7:46 AM",
    },
    {
      username: "Ellen Horst Mercer",
      message: "Expense shared. Review and confirm, please.",
      amount: 3,
      time: "11:30 AM",
    },
    {
      username: "Iris Hel Martínek",
      message: "Check your inbox. Shared expenses details.",
      amount: 1,
      time: "12:20 PM",
    },
    {
      username: "Fitzwilliam Ravza Vicario",
      message: "Confirmed payment. Verify shared expenses.",
      amount: 4,
      time: "5:30 PM",
    },
  ];
  return (
    <div className="min-h-screen  w-full">
      <header className="relative flex w-full justify-center">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => router.push("/home")}
        >
          <Image src={arrow as string} width={35} height={35} alt="" />
        </button>
        <h1 className="font-lato text-3xl font-bold uppercase">Inbox</h1>
      </header>
      <main className="my-4 flex flex-col">
        <nav className="flex pl-1">
          {Object.values(MessageType).map((type) => (
            <button
              key={type}
              className={`${
                type === tab ? "bg-zinc-300 font-bold" : "bg-white"
              } rounded-t-md px-4 py-1 font-lato text-sm `}
              onClick={() => setTab(type)}
            >
              {type}
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-0">
          {messages.map((message, i) => (
            <div
              key={i}
              className="flex items-center justify-evenly gap-2 border-y border-black px-4 py-2"
            >
              <Image width={50} height={50} alt="" src={user} />
              <div className="flex flex-col gap-0">
                <p className="flex items-end gap-2">
                  <span className="font-lato text-base font-bold ">
                    {message.username}
                  </span>
                  <span className="font-lato text-xs font-bold">
                    {message.time}
                  </span>
                </p>
                <p className="font-lato text-sm">{message.message}</p>
              </div>
              <div className="h-fit min-w-[30px] rounded-full bg-zinc-300 px-2 py-1 text-center font-lato text-xs font-bold">
                {message.amount}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;
