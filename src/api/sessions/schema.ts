import { z } from "zod";

export const createSessionSchema = z.object({
  category: z
    .string({ required_error: "Category is required" })
    .min(1, { message: "Category must be at least 1 character" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must be at least 1 character" }),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character" }),
  is_active: z.boolean({ required_error: "Active status is required" }),
  student_type: z
    .string({ required_error: "Student type is required" })
    .min(1, { message: "Student type must be at least 1 character" }),
  tests: z
    .array(
      z
        .object({
          test_id: z
            .string({ required_error: "Test ID is required" })
            .min(1, { message: "Test ID must be at least 1 character" }),
          weight: z.coerce.number({ required_error: "Weight is required" }),
          multiplier: z.coerce.number({ required_error: "Multiplier is required" }),
          start_date: z
            .string({ required_error: "Start date is required" })
            .min(1, { message: "Start date must be at least 1 character" }),
          end_date: z
            .string({ required_error: "End date is required" })
            .min(1, { message: "End date must be at least 1 character" }),
        })
        .refine((data) => new Date(data.start_date) >= new Date(), {
          message: "Start date must not be in the past",
          path: ["start_date"],
        })
        .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
          message: "End date must be after start date",
          path: ["end_date"],
        }),
    )
    .min(1, { message: "At least one test must be provided" }),
});

export const updateSessionSchema = z.object({
  category: z
    .string({ required_error: "Category is required" })
    .min(1, { message: "Category must be at least 1 character" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must be at least 1 character" }),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character" }),
  student_type: z
    .string({ required_error: "Student type is required" })
    .min(1, { message: "Student type must be at least 1 character" }),
  tests: z
    .array(
      z.object({
        test_id: z
          .string({ required_error: "Test ID is required" })
          .min(1, { message: "Test ID must be at least 1 character" }),
        weight: z.number({ required_error: "Weight is required" }),
        multiplier: z.number({ required_error: "Multiplier is required" }),
        start_date: z
          .string({ required_error: "Start date is required" })
          .min(1, { message: "Start date must be at least 1 character" }),
        end_date: z
          .string({ required_error: "End date is required" })
          .min(1, { message: "End date must be at least 1 character" }),
      }),
    )
    .min(1, { message: "At least one test must be provided" }),
});
