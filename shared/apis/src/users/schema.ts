import { z } from "zod";

const baseUserSchema = {
  email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
  fullname: z.string({ required_error: "Full name is required" }).min(1, "Full name is required"),
  is_active: z.boolean({ required_error: "Active status is required" }),
  phone_number: z
    .string({ required_error: "Phone number is required" })
    .min(10, "Phone number must be at least 10 characters")
    .max(14, "Phone number must be at most 14 characters")
    .regex(/^\d+$/, "Phone number must contain digits only"),
  referral_code: z.string().optional().nullable(),
  referred_by: z.string().optional().nullable(),
  role_id: z.string({ required_error: "Role is required" }).min(1, "Role is required"),
  student_type: z
    .string({ required_error: "Student type is required" })
    .min(1, "Student type is required"),
};

export const userCreateSchema = z.object({
  ...baseUserSchema,
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const userUpdateSchema = z.object({
  ...baseUserSchema,
  id: z.string({ required_error: "ID is required" }).min(1, "ID is required"),
  avatar: z.string({ required_error: "Avatar is required" }).nullable(),
  religion: z.string({ required_error: "Religion is required" }).nullable(),
  birthdate: z.string({ required_error: "Birthdate is required" }).nullable(),
  gender: z.string({ required_error: "Gender is required" }).nullable(),
  identity_number: z
    .string({ required_error: "Identity number is required" })
    .min(1, "Identity number is required")
    .nullable(),
});

export const userUpdateBackofficeSchema = z.object({
  ...baseUserSchema,
  id: z.string({ required_error: "ID is required" }).min(1, "ID is required"),
});

export const userActivateSchema = z.object({
  id: z.string({ required_error: "ID is required" }).min(1, "ID is required"),
  is_active: z.boolean({ required_error: "Active status is required" }),
});

export const userCompletePaymentSchema = z.object({
  id: z.string({ required_error: "ID is required" }).min(1, "ID is required"),
  is_payment_completed: z.boolean({ required_error: "Payment status is required" }),
});
