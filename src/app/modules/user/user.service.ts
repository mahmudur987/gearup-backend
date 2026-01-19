// src/modules/user/user.service.ts
import AppError from "../../errorHandler/AppError";
import { createUserToken } from "../../utils/createUserToken";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";
const createUser = async (payload: IUser) => {
  if (!payload.password || !payload.email || !payload.mobile) {
    throw new AppError(400, "email, mobile and password are required");
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }
  const user = await User.create(payload);

  const { accessToken, refreshToken } = await createUserToken(user);

  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const UserService = {
  createUser,
};
