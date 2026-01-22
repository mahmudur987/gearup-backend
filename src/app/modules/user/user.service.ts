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

const updateUserProfile = async (id: string, payload: Partial<IUser>) => {
  const { email, mobile, nidNumber, passportNumber } = payload;
  let errorMessage = "";
  let query: Partial<IUser> = {};
  if (email) {
    query.email = email;
    errorMessage = "email already exist";
  }
  if (mobile) {
    query.mobile = mobile;
    errorMessage = "mobile already exist";
  }
  if (nidNumber) {
    query.nidNumber = nidNumber;
    errorMessage = "nidNumber already exist";
  }
  if (passportNumber) {
    query.passportNumber = passportNumber;
    errorMessage = "passportNumber already exist";
  }
  const isUserExist = await User.findOne(query);
  if (isUserExist) {
    throw new AppError(400, errorMessage);
  }

  if (payload.password) {
    payload.password = await bcrypt.hash(payload.password, 10);
  }

  const user = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return user;
};
const getUserProfile = async (id: string) => {
  const user = await User.findById(id);
  return user;
};
export const UserService = {
  createUser,
  getAllUsers,
  updateUserByAdmin,
  getUserProfile,
  updateUserProfile,
};
