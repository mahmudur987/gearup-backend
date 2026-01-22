// src/modules/user/user.service.ts
import AppError from "../../errorHandler/AppError";
import { createUserToken } from "../../utils/createUserToken";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from "bcryptjs";
const createUser = async (payload: IUser) => {
  if (!payload.password || !payload.email || !payload.mobile) {
    throw new AppError(400, "email, mobile and password are required");
  }
  // search user by email and mobile number
  const userByEmail = await User.findOne({ email: payload.email });
  const userByMobile = await User.findOne({ mobile: payload.mobile });

  if (userByEmail || userByMobile) {
    throw new AppError(400, "User already exist");
  }
  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const authProvider: IAuthProvider[] = [
    {
      provider: "credential",
      providerId: payload.email,
    },
  ];

  const user = await User.create({ auth: authProvider, ...payload });

  const { accessToken, refreshToken } = await createUserToken(user);

  return {
    accessToken,
    refreshToken,
    user,
  };
};
export const getAllUsers = async () => {
  const users = await User.find({ isDeleted: false });
  return users;
};

export const updateUserByAdmin = async (
  id: string,
  payload: Partial<IUser>,
) => {
  const user = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
  updateUserByAdmin,
};
