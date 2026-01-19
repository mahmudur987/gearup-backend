import { envVariables } from "../config/env.config";
import { IUser } from "../modules/user/user.interface";
import { generateToken } from "./generateToken";

export const createUserToken = (user: Partial<IUser>) => {
  const jwtPayload = {
    name: user.fullName,
    email: user.email,
    _id: user._id,
    phone: user.mobile,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    envVariables.ACCESS_TOKEN_SECRET,
    envVariables.ACCESS_TOKEN_EXPIRES,
  );
  const refreshToken = generateToken(
    jwtPayload,
    envVariables.REFRESH_TOKEN_SECRET,
    envVariables.REFRESH_TOKEN_EXPIRES,
  );
  return { accessToken, refreshToken };
};
