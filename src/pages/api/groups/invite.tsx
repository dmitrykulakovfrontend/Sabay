import { db } from "@/utils/db";
import { type NextApiRequest, type NextApiResponse } from "next";
import { uploadImage } from "@/utils/cloudinary";
import { getServerAuthSession } from "../auth/[...nextauth]";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.body);
  const { email, groupId, groupName } = req.body as {
    email: string;
    groupId: string;
    groupName: string;
  };
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    throw new Error("To create a transaction you need to login");
  }
  const userToInvite = await db.user.findFirst({
    where: { email },
  });
  if (!userToInvite) {
    throw new Error("User not found");
  }
  await db.inviteNotification.create({
    data: {
      userId: userToInvite.id,
      groupId,
      invitedBy: session.user.name ?? session.user.email ?? "",
      groupName,
    },
  });

  res.status(200).json({ invited: true });
}
