import Footer from "@/components/Footer";
import React from "react";
import arrow from "@/assets/clarity-arrow-line.svg";
import Image from "next/image";
import notificationSrc from "@/assets/notification.png";
import { useRouter } from "next/router";
import notification from "@/assets/carbon-notification.svg";
import { db } from "@/utils/db";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { getServerAuthSession } from "./api/auth/[...nextauth]";

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const session = await getServerAuthSession({ req, res });
  const invites = await db.inviteNotification.findMany({
    where: {
      userId: session?.user.id,
    },
  });
  return {
    props: {
      invites,
    },
  };
};

const Notification = ({
  invites,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const notifications = [
    {
      type: "Group Invitation",
      content: "[User Name] has invited you to join [Group Name]",
      time: "10:30 AM",
    },
    {
      type: "Group Invitation",
      content: "[User Name] has invited you to join [Group Name]",
      time: "10:30 AM",
    },
    {
      type: "Group Invitation",
      content: "[User Name] has invited you to join [Group Name]",
      time: "10:30 AM",
    },
    {
      type: "Community Invitation",
      content: "[User Name] has invited you to join [Community Name]",
      time: "10:30 AM",
    },
    {
      type: "Community Invitation",
      content: "[User Name] has invited you to join [Community Name]",
      time: "10:30 AM",
    },
    {
      type: "Group Creation",
      content: "You have successfully created [Group Name]",
      time: "10:30 AM",
    },
    {
      type: "Transaction Complete",
      content: "Successfully paid [Transaction Title] with [Group Name]",
      time: "10:30 AM",
    },
  ];
  return (
    <div className="min-h-screen  w-full p-4">
      <header className="relative flex w-full justify-center">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2"
          onClick={() => router.push("/home")}
        >
          <Image src={arrow as string} width={35} height={35} alt="" />
        </button>
        <h1 className="font-lato text-3xl font-bold uppercase">
          Notifications
        </h1>
      </header>
      <main className="my-4 flex flex-col gap-4">
        <div className="flex flex-col gap-0">
          {invites.map((invite, i) => (
            <div
              key={i}
              className="relative flex items-center justify-start gap-2 px-4 py-2"
            >
              <Image width={40} height={40} alt="" src={notificationSrc} />
              <div className="flex flex-col gap-0">
                <p className="font-lato text-xs font-bold">Group Invitation</p>
                <p className="font-lato text-sm">
                  {invite.invitedBy} has invited you to join {invite.groupName}
                </p>
              </div>
              <div className="absolute right-2 top-1 -translate-x-2 font-lato text-xs font-bold">
                {invite.createdAt.toLocaleString()}
              </div>
            </div>
          ))}
          {/* {notifications.map((notification, i) => (
            <div
              key={i}
              className="relative flex items-center justify-start gap-2 px-4 py-2"
            >
              <Image width={40} height={40} alt="" src={notificationSrc} />
              <div className="flex flex-col gap-0">
                <p className="font-lato text-xs font-bold">
                  {notification.type}
                </p>
                <p className="font-lato text-sm">{notification.content}</p>
              </div>
              <div className="absolute right-2 top-1 -translate-x-2 font-lato text-xs font-bold">
                {notification.time}
              </div>
            </div>
          ))} */}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Notification;
