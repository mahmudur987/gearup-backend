// src/modules/user/user.model.ts
import { Schema, model } from "mongoose";
import { IUser, Role, Status } from "./user.interface";
const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  {
    versionKey: false,
    _id: false,
  },
);
const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    nidNumber: { type: String, unique: true, sparse: true },
    passportNumber: { type: String, unique: true, sparse: true },
    isMobileVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isNidVerified: { type: Boolean, default: false },
    isPassportVerified: { type: Boolean, default: false },
    profileImage: { type: String, default: null },
    role: { type: String, enum: Role, default: "user" },
    isDeleted: { type: Boolean, default: false },
    status: {
      type: String,
      enum: Status,
      default: "active",
    },
    auth: [authProviderSchema],
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
