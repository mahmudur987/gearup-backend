export interface IUser {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  address?: string;
  nidNumber?: string;
  passportNumber?: string;
  isMobileVerified: boolean;
  isEmailVerified: boolean;
  isNidVerified: boolean;
  isPassportVerified: boolean;
  verifiedBy?: "nid" | "passport" | "admin";
  profileImage?: string;
  role?: "user" | "seller" | "admin";
  createdAt?: Date;
  updatedAt?: Date;
}
