import { z } from "zod";

export const createOptionSchema = z.object({
  label: z.string({ required_error: "Label is required" }),
  is_correct: z.boolean({ required_error: "Is Correct is required" }),
  image_url: z.string().nullable().optional(),
});

export const updateOptionSchema = z.object({
  id: z.string({ required_error: "ID is required" }),
  label: z.string({ required_error: "Label is required" }),
  is_correct: z.boolean({ required_error: "Is Correct is required" }),
  image_url: z.string().nullable().optional(),
});
