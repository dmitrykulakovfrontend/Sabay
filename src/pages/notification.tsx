import Footer from "@/components/Footer";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Modal from "react-modal";
import { db } from "@/utils/db";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { getServerAuthSession } from "./api/auth/[...nextauth]";

import arrow from "@/assets/clarity-arrow-line.svg";
import notificationSrc from "@/assets/notification.png";
import notification from "@/assets/carbon-notification.svg";
import inviteSrc from "@/assets/https-lottiefiles-com-animations-mail-jkbgv-1-uxpu.svg";

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
  type StringifiedInvites = (Omit<(typeof invites)[number], "createdAt"> & {
    createdAt: string;
  })[];
  return {
    props: {
      invites: JSON.parse(JSON.stringify(invites)) as StringifiedInvites,
    },
  };
};

const Notification = ({
  invites,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState<(typeof invites)[number]>();
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

  async function handleInvite(accepted: boolean) {
    await fetch("/api/groups/handleinvite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: notification?.groupId,
        userId: notification?.userId,
        notificationId: notification?.id,
        accepted,
      }),
    });
    setIsOpen(false);
    setNotification(undefined);
    window.location.reload();
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
        <h1 className="font-lato text-3xl font-bold uppercase">
          Notifications
        </h1>
      </header>
      <main className="my-4 flex flex-col gap-4">
        <div className="flex flex-col gap-0">
          {invites.map((invite, i) => (
            <button
              key={i}
              className="relative flex items-center justify-start gap-2 px-4 py-2"
              onClick={() => {
                setNotification(invite);
                setIsOpen(true);
              }}
            >
              <Image width={40} height={40} alt="" src={notificationSrc} />
              <div className="flex flex-col gap-0 text-left">
                <p className="font-lato text-xs font-bold">Group Invitation</p>
                <p className="font-lato text-sm">
                  {invite.invitedBy} has invited you to join {invite.groupName}
                </p>
              </div>
              <div
                className="absolute right-2 top-1 -translate-x-2 font-lato text-xs font-bold"
                title={new Date(invite.createdAt).toTimeString()}
              >
                {new Date(invite.createdAt).toDateString()}
              </div>
            </button>
          ))}
          <Modal
            overlayClassName="fixed inset-0 bg-transparent"
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={true}
            onRequestClose={() => setIsOpen(false)}
            contentLabel="Notification"
            className="absolute left-1/2 top-1/2 h-fit w-full max-w-xs -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col gap-2 rounded-lg bg-gradient-to-b from-secondary to-other p-4 font-lato text-white">
              <h2 className="text-center text-2xl font-bold uppercase">
                You have been invited!
              </h2>
              <Image
                src={inviteSrc as string}
                width={150}
                height={150}
                className="mx-auto"
                alt=""
              />
              <p className="text-center font-lato">
                You have been invited by{" "}
                <span className="font-bold underline underline-offset-1">
                  {notification?.invitedBy}
                </span>{" "}
                to join{" "}
                <span className="font-bold underline underline-offset-1">
                  {notification?.groupName}
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleInvite(true)}
                  style={{
                    boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.35)",
                  }}
                  className="mx-auto w-fit flex-1 rounded-xl bg-[#A6D3AA] py-2 font-bold uppercase"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleInvite(false)}
                  style={{
                    boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.35)",
                  }}
                  className="mx-auto w-fit flex-1 rounded-xl bg-[#F59D9D] py-2 font-bold uppercase"
                >
                  Reject
                </button>
              </div>
            </div>
          </Modal>
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
