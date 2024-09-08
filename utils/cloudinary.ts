import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
  file: File,
  resourceType: "image" | "video" | "auto"
) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      if (fileReader.result && typeof fileReader.result === "string") {
        const buffer = Buffer.from(fileReader.result.split(",")[1], "base64");
        uploadStream.end(buffer);
      } else {
        reject(new Error("Échec de la lecture du fichier"));
      }
    };
  });
}
