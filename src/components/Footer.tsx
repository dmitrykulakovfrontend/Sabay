import React from "react";

import home from "@/assets/tabler-home.svg";
import user from "@/assets/heroicons-user-group.svg";
import mainMenu from "@/assets/main_menu.svg";
import chat from "@/assets/quill-chat.svg";
import notification from "@/assets/carbon-notification.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-around gap-4">
      <Link href={"/home"}>
        <Image width={35} height={35} src={home as string} alt="" />
      </Link>
      <Link href={"/home"}>
        <Image width={35} height={35} src={user as string} alt="" />
      </Link>
      <Link href={"/home"}>
        <Image width={65} height={65} src={mainMenu as string} alt="" />
      </Link>
      <Link href={"/home"}>
        <Image width={35} height={35} src={chat as string} alt="" />
      </Link>
      <Link href={"/home"}>
        <Image width={35} height={35} src={notification as string} alt="" />
      </Link>
    </footer>
  );
};

export default Footer;
