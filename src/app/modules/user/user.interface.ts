export enum Role {
  USER = "user",
  SELLER = "seller",
  ADMIN = "admin",
}
export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
  SUSPENDED = "suspended",
}

export interface IUser {
  _id?: string;
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
  role?: Role;
  isDeleted?: boolean;
  isActive?: Status;
  createdAt?: Date;
  updatedAt?: Date;
}
