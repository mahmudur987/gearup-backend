// / -------------------------------------------------
// src/modules/product/product.model.ts
import { Schema, model } from "mongoose";
import { IProduct } from "./product.interface";

const externalListingSchema = new Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false },
);

const productSchema = new Schema<IProduct>(
  {
    // Core identity
    title: { type: String, required: true, trim: true },
    vehicleType: {
      type: String,
      enum: ["cycle", "bike", "car"],
      required: true,
    },
    productType: {
      type: String,
      enum: ["vehicle", "part"],
      required: true,
    },
    cycleType: {
      type: String,
      enum: ["mtb", "road", "hybrid", "bmx", "folding", "kids", "electric"],
      required: function () {
        return this.vehicleType === "cycle" && this.productType === "vehicle";
      },
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    condition: {
      type: String,
      enum: ["new", "used", "recondition"],
      required: true,
    },

    // Ownership & location
    location: { type: String, required: true },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    contactVisible: { type: Boolean, default: true },

    // Description & media
    description: { type: String },
    images: [{ type: String }],
    videoUrl: { type: String },

    // Vehicle-specific
    model: { type: String },
    year: { type: Number },
    mileage: { type: Number },
    engineCC: { type: Number },
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "hybrid"],
    },
    registrationStatus: {
      type: String,
      enum: ["registered", "unregistered"],
    },
    frameSize: { type: String },

    // Part-specific
    partCategory: { type: String },
    compatibleWith: [{ type: String }],
    isOriginal: { type: Boolean },
    usedFor: {
      type: String,
      enum: ["cycle", "bike", "car"],
    },

    // External marketplace links
    externalListings: [externalListingSchema],

    // Lifecycle & business
    status: {
      type: String,
      enum: ["draft", "active", "sold", "blocked"],
      default: "draft",
    },
    isFeatured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    expiresAt: { type: Date },
  },
  { timestamps: true },
);

export const Product = model<IProduct>("Product", productSchema);
