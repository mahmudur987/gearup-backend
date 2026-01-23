import z from "zod";
export const createCyclePartsZodSchema = z.object({
  title: z.string().min(5),
  brand: z.string().min(2),
  price: z.number().positive(),
  condition: z.enum(["new", "used", "recondition"]),
  location: z.string().min(3),
  sellerId: z.string(),
  contactVisible: z.boolean(),
  description: z.string().min(10).max(1000),
  images: z.array(z.string().url()).min(1).max(10),
  videoUrl: z.string().url().optional(),
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
