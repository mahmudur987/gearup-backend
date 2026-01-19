import { NextFunction, Request, Response } from "express";
import statusCode from "http-status-codes";

import { catchAsync } from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserService.createUser(req.body);

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

export const UserController = {
  createUser,
};
