// src/modules/product/product.interface.ts
import { Types } from "mongoose";

export type VehicleType = "cycle" | "bike" | "car";
export type ProductType = "vehicle" | "part";
export type ConditionType = "new" | "used" | "recondition";
export type ProductStatus = "draft" | "active" | "sold" | "blocked";

// Cycle-specific type
export type CycleType =
  | "mtb"
  | "road"
  | "hybrid"
  | "bmx"
  | "folding"
  | "kids"
  | "electric";
export interface IExternalListing {
  platform: string;
  url: string;
}

export interface IProduct {
  // Core identity
  title: string;
  vehicleType: VehicleType;
  productType: ProductType;
  brand: string;
  price: number;
  condition: ConditionType;

  // Ownership & location
  location: string;
  sellerId: Types.ObjectId;
  contactVisible?: boolean;

  // Description & media
  description?: string;
  images?: string[];
  videoUrl?: string;

  // Vehicle-specific (optional)
  model?: string;
  year?: number;
  mileage?: number;
  engineCC?: number;
  fuelType?: "petrol" | "diesel" | "electric" | "hybrid";
  registrationStatus?: "registered" | "unregistered";
  frameSize?: string;
  cycleType?: CycleType;

  // Part-specific (optional)
  partCategory?: string;
  compatibleWith?: string[];
  isOriginal?: boolean;
  usedFor?: VehicleType;

  // External marketplace links
  externalListings?: IExternalListing[];

  // Lifecycle & business
  status?: ProductStatus;
  isFeatured?: boolean;
  views?: number;
  expiresAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
