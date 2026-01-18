// src/modules/user/user.model.ts
import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

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
    verifiedBy: { type: String, enum: ["nid", "passport", "admin"] },
    profileImage: { type: String },
    role: { type: String, enum: ["user", "seller", "admin"], default: "user" },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
