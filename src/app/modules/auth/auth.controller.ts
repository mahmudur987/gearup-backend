import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsynch";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.services";

const credentialsLogIn = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await authService.credentialsLogIn(payload);
  res.cookie("accessToken", result.accessToken, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  res.cookie("refreshToken", result.refreshToken, {
    maxAge: 3 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "user created successfully",
    data: result,
  });
});

export const AuthController = {
  credentialsLogIn,
};
