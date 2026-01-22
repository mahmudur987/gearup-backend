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
export interface IAuthProvider {
  provider: string;
  providerId: string;
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
  profileImage?: string;
  role?: Role;
  isDeleted?: boolean;
  status?: Status;
  auth?: IAuthProvider[];
  createdAt?: Date;
  updatedAt?: Date;
}
