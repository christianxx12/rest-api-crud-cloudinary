import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(filePath) {
  return await cloudinary.uploader.upload(filePath, {
    folder: "tienda",
  });
}

export async function deleteImage(public_id) {
  return await cloudinary.uploader.destroy(public_id);
}
