import { z } from "zod";

const requiredString = (field: string) =>
  z.string({ required_error: `${field} Required` }).min(1, { message: `${field} Required` });

const emailSchema = requiredString("Email").email({ message: "Invalid email" });

const passwordSchema = z
  .string({ required_error: "Password Required" })
  .min(6, { message: "Password must be at least 6 characters" });

const otpSchema = requiredString("OTP");

export const loginSchema = z.object({
  email: emailSchema,
  password: requiredString("Password"),
});

export const registerSchema = z.object({
  email: emailSchema,
  fullname: requiredString("Fullname"),
  password: passwordSchema,
  phone_number: z
    .string({ required_error: "Phone Number Required" })
    .min(10, { message: "Phone Number must be at least 10 digits" }),
  student_type: requiredString("Student Type"),
  referral_code: z.string().optional().nullable(),
  referred_by: z.string().optional().nullable(),
  terms_and_conditions: z.boolean(),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const newPasswordSchema = z.object({
  email: emailSchema,
  otp: otpSchema,
  password: passwordSchema,
});

export const sendOtpSchema = z.object({
  email: emailSchema,
});

export const verifyEmailSchema = z.object({
  email: emailSchema,
  otp: otpSchema,
});
