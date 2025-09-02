import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  
});
console.log("📡 Cloudinary Config:", cloudinary.config());

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatars", 
    format: async (req, file) => {
      const fileType = file.mimetype.split("/")[1];
      return ["jpeg", "png", "jpg"].includes(fileType) ? fileType : "png";
    },
    public_id: (req, file) => `${Date.now()}-${file.originalname.split(".")[0]}`,
  }
});

export { cloudinary, storage };
