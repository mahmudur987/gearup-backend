import { z } from "zod";

const createUserZodSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Name must be at least 5 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one digit",
    })
    .regex(/[@$!%*?&#^()\-_=+{}[\]|;:'",.<>/~`]/, {
      message: "Password must contain at least one special character",
    }),
  mobile: z.string().regex(/^01[3-9]\d{8}$/, {
    message: "Phone number must be a valid 11-digit Bangladeshi number.",
  }),
});
const logInUserZodSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(5, { message: "Name must be at least 5 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .optional(),
  mobile: z
    .string()
    .regex(/^01[3-9]\d{8}$/, {
      message: "Phone number must be a valid 11-digit Bangladeshi number.",
    })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one digit",
    })
    .regex(/[@$!%*?&#^()\-_=+{}[\]|;:'",.<>/~`]/, {
      message: "Password must contain at least one special character",
    }),
});
export const userValidation = { createUserZodSchema, logInUserZodSchema };
