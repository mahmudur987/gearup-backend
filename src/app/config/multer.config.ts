import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinaryUpload } from "./cloudinary.config";

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryUpload,
  params: {
    public_id: (req, file) => {
      const baseName = file.originalname.toLowerCase().replace(/\s+/g, "-");
      const extension = file.originalname.split(".").pop() || "";
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2);
      const uniqueFileName = `${randomString}-${timestamp}-${baseName}.${extension}`;
      return uniqueFileName;
    },
  },
});

export const multerUpload = multer({ storage: storage });
