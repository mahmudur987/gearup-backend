import AppError from "../../errorHandler/AppError";
import { createUserToken } from "../../utils/createUserToken";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import bcrypt from "bcryptjs";
const credentialsLogIn = async (payload: Partial<IUser>) => {
  const email = payload.email || null;
  const password: string = payload.password || "";
  const mobile = payload.mobile || null;

  if ((!email || !mobile) && !password) {
    throw new AppError(400, "email or mobile and password are required");
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

export const authService = { credentialsLogIn };
