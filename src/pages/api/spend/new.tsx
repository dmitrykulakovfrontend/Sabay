import { db } from "@/utils/db";
import { type NextApiRequest, type NextApiResponse } from "next";
import { uploadImage } from "@/utils/cloudinary";
import { getServerAuthSession } from "../auth/[...nextauth]";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.body);
  const form = req.body as {
    type: string;
    date: string;
    amount: number;
    groupId: string;
    splitType: string;
    title: string;
    description: string;
    groupName: string;
  };
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    throw new Error("To create a spend you need to login");
  }
  await db.group.update({
    where: { id: form.groupId },
    data: {
      transactions: {
        create: {
          amount: form.amount,
          title: form.title,
          description: form.description,
          splitType: form.splitType,
          date: form.date,
          type: form.type,
        },
      },
    },
  });

  await db.transactionNotification.create({
    data: {
      amount: form.amount,
      title: form.title,
      type: form.type,
      userId: session.user.id,
      requestedBy: session.user.name ?? "error",
      groupId: form.groupId,
      groupName: form.groupName,
    },
  });

  res.status(200).json({ created: true });
}
