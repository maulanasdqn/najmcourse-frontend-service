import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email Required" })
    .min(1, { message: "Email Required" })
    .email({ message: "Invalid email" }),
  password: z
    .string({ required_error: "Password Required" })
    .min(1, { message: "Password Required" }),
});

export const registerSchema = z.object({
  email: z
    .string({ required_error: "Email Required" })
    .min(1, { message: "Email Required" })
    .email({ message: "Invalid email" }),
  fullname: z
    .string({ required_error: "Fullname Required" })
    .min(1, { message: "Fullname Required" }),
  password: z
    .string({ required_error: "Password Required" })
    .min(6, { message: "Password must be at least 6 characters" }),
  phone_number: z
    .string({ required_error: "Phone Number Required" })
    .min(10, { message: "Phone Number must be at least 10 digits" }),
  student_type: z
    .string({ required_error: "Student Type Required" })
    .min(1, { message: "Student Type Required" }),
  referral_code: z.string().optional().nullable(),
  referred_by: z.string().optional().nullable(),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email Required" })
    .min(1, { message: "Email Required" })
    .email({ message: "Invalid email" }),
});

export const newPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email Required" })
    .min(1, { message: "Email Required" })
    .email({ message: "Invalid email" }),
  otp: z.string({ required_error: "OTP Required" }).min(1, { message: "OTP Required" }),
  password: z
    .string({ required_error: "Password Required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const sendOtpSchema = z.object({
  email: z
    .string({ required_error: "Email Required" })
    .min(1, { message: "Email Required" })
    .email({ message: "Invalid email" }),
});

export const verifyEmailSchema = z.object({
  email: z
    .string({ required_error: "Email Required" })
    .min(1, { message: "Email Required" })
    .email({ message: "Invalid email" }),
  otp: z.string({ required_error: "OTP Required" }).min(1, { message: "OTP Required" }),
});
