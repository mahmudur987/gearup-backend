import { baseProductSchema } from "../cycle.validate";
import z from "zod";
export const createCyclePartsZodSchema = z.object({
  ...baseProductSchema,
  vehicleType: z.literal("cycle"),
  productType: z.literal("part"),

  partCategory: z.string().min(2),
  compatibleWith: z
    .array(
      z.enum(["mtb", "road", "hybrid", "bmx", "folding", "kids", "electric"]),
    )
    .min(1),

  isOriginal: z.boolean(),
});
