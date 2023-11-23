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
    <footer className="fixed bottom-0 left-0 flex w-full items-center justify-around gap-4 bg-white py-2">
      <Link href={"/home"}>
        <Image width={35} height={35} src={home as string} alt="" />
      </Link>
      <Link href={"/communities"}>
        <Image width={35} height={35} src={user as string} alt="" />
      </Link>
      <Link href={"/spend"}>
        <Image width={65} height={65} src={mainMenu as string} alt="" />
      </Link>
      <Link href={"/chat"}>
        <Image width={35} height={35} src={chat as string} alt="" />
      </Link>
      <Link href={"/notification"}>
        <Image width={35} height={35} src={notification as string} alt="" />
      </Link>
    </footer>
  );
};

export default Footer;
