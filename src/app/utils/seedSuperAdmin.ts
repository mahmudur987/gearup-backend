/* eslint-disable no-console */
import { envVariables } from "../config/env.config";
import { IUser, Role, Status } from "../modules/user/user.interface";

import { User } from "../modules/user/user.model";
import bcrypt from "bcryptjs";

export const seedAdmin = async () => {
  const isAdminExist = await User.findOne({
    email: "admin@gmail.com",
  });

  if (isAdminExist) {
    console.log("Admin Exist");
    return;
  }

  const hashPass = await bcrypt.hash("A@123456", 10);

  try {
    const Admin: Partial<IUser> = {
      fullName: "Super Admin",
      email: "admin@gmail.com",
      mobile: "01671706882",
      password: hashPass,
      role: Role.ADMIN,
      profileImage: "",
      address: "Dhaka",
      isDeleted: false,
      isActive: Status.ACTIVE,
      nidNumber: "123456789",
      passportNumber: "123456789",
      isMobileVerified: true,
      isEmailVerified: true,
      isNidVerified: true,
      isPassportVerified: true,
    };
    await User.create(Admin);

    console.log(" admin created");
  } catch (error) {
    console.error(error);
  }
};
