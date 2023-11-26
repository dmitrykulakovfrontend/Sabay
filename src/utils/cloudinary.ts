import { env } from "@/env.mjs";
import { type UploadApiOptions, v2 as cloudinary } from "cloudinary";

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(
  imagePath: string,
  folder: string,
  imageId?: string,
) {
  const options: UploadApiOptions = {
    unique_filename: true,
    folder: "Sabay/groupIcons",
    public_id: imageId,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
}

export default cloudinary;
