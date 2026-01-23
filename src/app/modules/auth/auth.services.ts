import { is } from "zod/v4/locales";
import AppError from "../../errorHandler/AppError";
import { createUserToken } from "../../utils/createUserToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
const credentialsLogIn = async (payload: Partial<IUser>) => {
  const email = payload.email || null;
  const password: string = payload.password || "";
  const mobile = payload.mobile || null;

  if ((!email && !mobile) || !password) {
    throw new AppError(400, "Email or mobile and password are required");
  }

  const query: { email?: string; mobile?: string } = {};
  if (email) {
    query.email = email;
  }
  if (mobile) {
    query.mobile = mobile;
  }
  const isUserExist = await User.findOne(query);

  if (!isUserExist) {
    throw new AppError(400, "User not found");
  }
  if (!isUserExist.password) {
    throw new AppError(400, "Password is not set for this user");
  }
  const passwordMatch = await bcrypt.compare(password, isUserExist.password);

  if (!passwordMatch) {
    throw new AppError(400, "incorrect password");
  }

  const { accessToken, refreshToken } = await createUserToken(isUserExist);

  return {
    accessToken,
    refreshToken,
    user: isUserExist,
  };
};

const setPasswordForGoogleUser = async (user: Partial<IUser>) => {
  const isUserExist = await User.findOne({ email: user.email });
  if (!isUserExist) {
    throw new Error("User not found");
  }
  const isGoogleUser = isUserExist?.auth?.some((a) => a.provider === "google");
  if (!isGoogleUser) {
    throw new Error("User is not a Google user");
  }

  if (isUserExist.password) {
    throw new Error("Password is already set for user");
  }
  if (!user.password || typeof user.password !== "string") {
    throw new Error("Password is required and must be a string");
  }
  isUserExist.password = await bcrypt.hash(user.password, 12);
  await isUserExist.save();
  return isUserExist;
};

export const authService = { credentialsLogIn, setPasswordForGoogleUser };
