/* eslint-disable @next/next/no-img-element */
import React, { type FormEventHandler, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { type InferGetServerSidePropsType } from "next";
import { db } from "@/utils/db";
import Modal from "react-modal";
import { CldImage } from "next-cloudinary";

import menu from "@/assets/mingcute-menu-fill.svg";
import search from "@/assets/mdi-magnify.svg";
import add from "@/assets/add.png";
import invite from "@/assets/mingcute-invite-fill.svg";
import user from "@/assets/iconoir-group.svg";
import pen from "@/assets/pepicons-pop-pen.svg";

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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<Blob>();
  const [name, setName] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      console.log("Please, select file you want to upload");
      return;
    }
    const resData = (await blobToData(file)) as string;

    console.log(resData);

    await fetch("/api/groups/new", {
      method: "POST",
      body: JSON.stringify({
        name,
        icon: resData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsOpen(false);
    setName("");
    setFile(undefined);
    window.location.reload();
  };
  const blobToData = (blob: Blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };
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
            Public Groups
            {!isCommunities && (
              <div className="absolute bottom-0 left-1/2 h-1 w-2/3 -translate-x-1/2 bg-black"></div>
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
              <div className="absolute bottom-0 left-1/2 h-1 w-2/3 -translate-x-1/2 bg-black"></div>
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
            <button
              onClick={() => setIsOpen(true)}
              className="flex h-32 w-32 flex-col items-center justify-evenly rounded-xl  font-merriweather "
            >
              <Image width={70} height={70} src={add} alt="Add" />
              <p>Create Group</p>
            </button>
            <Modal
              overlayClassName="fixed inset-0 bg-transparent"
              isOpen={modalIsOpen}
              shouldCloseOnOverlayClick={true}
              onRequestClose={() => setIsOpen(false)}
              contentLabel="Create group"
              className="absolute left-1/2 top-1/2 h-fit w-full max-w-xs -translate-x-1/2 -translate-y-1/2"
            >
              <form
                className="flex flex-col gap-2 rounded-lg bg-gradient-to-b from-secondary to-other p-5 font-lato text-white"
                onSubmit={handleSubmit}
              >
                <h2 className="text-center text-2xl font-bold uppercase">
                  Create group
                </h2>
                {/* <input type="file" name="file" id="file" /> */}

                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="dark:hover:bg-bray-800 relative flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-zinc-200 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center rounded-full border-2 border-dashed border-black p-2">
                      <Image
                        src={user as string}
                        alt=""
                        height={70}
                        width={70}
                      />
                    </div>
                    <Image
                      src={pen as string}
                      alt=""
                      width={17}
                      height={17}
                      className="absolute bottom-1 right-1"
                    />
                    <input
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setFile(e.target.files[0]);
                        }
                      }}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                    />
                    {file && (
                      <div className="absolute -left-1 -top-1 box-content h-32 w-32 rounded-lg border-2 border-black bg-primary">
                        <img
                          src={URL.createObjectURL(file)}
                          alt=""
                          className=" h-32 w-32 rounded-lg object-contain "
                        />
                      </div>
                    )}
                  </label>
                </div>
                <input
                  type="text"
                  className="mx-auto max-w-[150px] bg-transparent text-center font-lato font-bold placeholder:text-white placeholder:underline placeholder:underline-offset-2"
                  placeholder="Group Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                />

                {/* <div className="flex items-end justify-between">
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
                  />
                  <Image
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    alt=""
                    width={20}
                    height={20}
                    src={invite as string}
                  />
                </div> */}
                <button className="home-add-button-shadow mx-auto w-fit rounded-md bg-primary px-16 py-2 font-bold uppercase text-secondary">
                  Add
                </button>
              </form>
            </Modal>
            {groups.map((group) => (
              <Link
                key={group.id}
                className="relative bottom-0 flex h-32 w-32 flex-col items-center justify-center rounded-xl border bg-primary transition-all hover:bottom-2 hover:rotate-2 hover:scale-105"
                href={`/groups/${group.id}`}
              >
                <CldImage
                  className=" h-32 w-32 rounded-xl object-contain"
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
