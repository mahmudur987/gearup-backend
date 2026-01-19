/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { envVariables } from "../config/env.config";
import AppError from "../errorHandler/AppError";
import { deleteImageFromCLoudinary } from "../config/cloudinary.config";

export const globalErrorHandler = async (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.file) {
    await deleteImageFromCLoudinary(req.file.path);
  }

  if (req.files && (req.files.length as number) > 0) {
    const images = (req.files as Express.Multer.File[])?.map(
      (file) => file.path,
    );

    await Promise.all(images.map((image) => deleteImageFromCLoudinary(image)));
  }

  let statusCode = 500;
  let message = `something went wrong `;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
    stack: envVariables.NODE_ENV === "development" ? err.stack : null,
  });
};
