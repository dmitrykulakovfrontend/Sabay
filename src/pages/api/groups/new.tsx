import { db } from "@/utils/db";
import { type NextApiRequest, type NextApiResponse } from "next";
import { uploadImage } from "@/utils/cloudinary";
import { getServerAuthSession } from "../auth/[...nextauth]";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.body);
  const { name, description, icon } = req.body as {
    name: string;
    description: string;
    icon: string;
  };
  const session = await getServerAuthSession({ req, res });
  if (!session) {
    throw new Error("To create a group you need to login");
  }
  const iconUrl = await uploadImage(icon, "Sabay/groupIcons");
  if (!iconUrl) {
    throw new Error("We couldn't upload your image, please try again later.");
  }
  await db.group.create({
    data: {
      name,
      description,
      icon: iconUrl,
      users: {
        connect: {
          id: session.user.id,
        },
      },
    },
  });

  res.status(200).json({ created: true });
}
