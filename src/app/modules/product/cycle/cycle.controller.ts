import { Request, Response } from "express";
import { catchAsync } from "../../../utils/catchAsynch";
import sendResponse from "../../../utils/sendResponse";
import { cycleService } from "./cycle.service";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const createCycle = catchAsync(async (req: Request, res: Response) => {
  console.log(req.files);

  const result = await cycleService.createCycle({
    ...req.body,
    images: (req.files as Express.Multer.File[]).map((file) => file.path),
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});
const getCycles = catchAsync(async (req: Request, res: Response) => {
  const result = await cycleService.getCycles();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});
const getUserCycle = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;

  const result = await cycleService.getUserCycle(user._id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});
const getCycleById = catchAsync(async (req: Request, res: Response) => {
  const result = await cycleService.getCycleById(req.params.id as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});
export const cycleController = {
  createCycle,
  getCycles,
  getUserCycle,
  getCycleById,
};
