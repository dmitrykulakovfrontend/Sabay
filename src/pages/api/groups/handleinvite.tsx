import { db } from "@/utils/db";
import { type NextApiRequest, type NextApiResponse } from "next";
import { uploadImage } from "@/utils/cloudinary";
import { getServerAuthSession } from "../auth/[...nextauth]";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.body);
  const { groupId, userId, accepted, notificationId } = req.body as {
    groupId: string;
    userId: string;
    accepted: boolean;
    notificationId: string;
  };
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    throw new Error("To handle invite you need to login");
  }
  if (accepted) {
    await db.group.update({
      where: { id: groupId },
      data: {
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });
    await db.inviteNotification.delete({
      where: { id: notificationId },
    });
    res.status(200).json({ accepted: true });
  } else {
    await db.inviteNotification.delete({
      where: { id: notificationId },
    });
    res.status(200).json({ deleted: true });
  }
}
