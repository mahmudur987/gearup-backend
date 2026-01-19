import { NextFunction, Request, Response } from "express";
import statusCode from "http-status-codes";

import { catchAsync } from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import { profile } from "node:console";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = { ...req.body, profileImage: req.file?.path };

    const result = await UserService.createUser(payload);

    res.cookie("accessToken", result.accessToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.cookie("refreshToken", result.refreshToken, {
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    sendResponse(res, {
      statusCode: statusCode.CREATED,
      success: true,
      message: "user created successfully",
      data: result,
    });
  },
);
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "users fetched successfully",
    data: result,
  });
});

const updateUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.updateUserByAdmin(req.body.id, payload);
  sendResponse(res, {
    statusCode: statusCode.OK,
    success: true,
    message: "user updated successfully",
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  updateUserByAdmin,
};
