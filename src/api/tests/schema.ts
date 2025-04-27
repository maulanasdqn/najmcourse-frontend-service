import { z } from "zod";

export const createTestSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title must be at least 1 character" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must be at least 1 character" }),
  question_ids: z
    .array(z.string({ required_error: "Question ID must be a string" }))
    .min(1, { message: "At least one question must be selected" }),
});

export const updateTestSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, { message: "Title must be at least 1 character" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must be at least 1 character" }),
  question_ids: z
    .array(z.string({ required_error: "Question ID must be a string" }))
    .min(1, { message: "At least one question must be selected" }),
});
