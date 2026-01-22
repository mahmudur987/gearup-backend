import dotenv from "dotenv";
dotenv.config();

export const envVariables = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "",
  REDIS_USER_NAME: process.env.REDIS_USER_NAME || "",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "",
  REDIS_HOST: process.env.REDIS_HOST || "", // <- use env
  REDIS_PORT: process.env.REDIS_PORT || "", // <- use env

  ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || "2d",

  REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES || "2d",
};

export default envVariables;
