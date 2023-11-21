import React, { useState } from "react";
import Image from "next/image";
import menu from "@/assets/mingcute-menu-fill.svg";
import search from "@/assets/mdi-magnify.svg";
import add from "@/assets/add.svg";
import home from "@/assets/tabler-home.svg";
import user from "@/assets/heroicons-user-group.svg";
import mainMenu from "@/assets/main_menu.svg";
import chat from "@/assets/quill-chat.svg";
import notification from "@/assets/carbon-notification.svg";
const Home = () => {
  const [isCommunities, setCommunities] = useState(false);
  return (
    <div className="flex min-h-screen w-full flex-col justify-around px-8">
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
        <div className=" flex justify-around font-merriweather text-lg">
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
            <div className="flex h-32 w-80 items-end justify-center rounded-xl bg-zinc-300 pb-8 font-lato font-bold text-white">
              Community Name
            </div>
            <div className="flex h-32 w-80 items-end justify-center rounded-xl bg-zinc-300 pb-8 font-lato font-bold text-white">
              Community Name
            </div>
            <div className="flex h-32 w-80 items-end justify-center rounded-xl bg-zinc-300 pb-8 font-lato font-bold text-white">
              Community Name
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="flex h-32 w-32 flex-col items-center justify-evenly rounded-xl bg-zinc-300">
              <Image width={70} height={70} src={add as string} alt="Add" />
              <p>Create Group</p>
            </button>
            <div className="h-32 w-32 rounded-xl bg-zinc-300"></div>
            <div className="h-32 w-32 rounded-xl bg-zinc-300"></div>
            <div className="h-32 w-32 rounded-xl bg-zinc-300"></div>
            <div className="h-32 w-32 rounded-xl bg-zinc-300"></div>
            <div className="h-32 w-32 rounded-xl bg-zinc-300"></div>
          </div>
        )}
      </div>
      <footer className="flex w-full items-center justify-around gap-4">
        <button>
          <Image width={35} height={35} src={home as string} alt="" />
        </button>
        <button>
          <Image width={35} height={35} src={user as string} alt="" />
        </button>
        <button>
          <Image width={65} height={65} src={mainMenu as string} alt="" />
        </button>
        <button>
          <Image width={35} height={35} src={chat as string} alt="" />
        </button>
        <button>
          <Image width={35} height={35} src={notification as string} alt="" />
        </button>
      </footer>
    </div>
  );
};

export default Home;
