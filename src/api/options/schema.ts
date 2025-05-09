import { z } from "zod";

export const optionCreateSchema = z.object({
  id: z.string().trim().optional().nullable(),
  label: z.string().trim().optional().nullable(),
  is_correct: z.boolean().nullable(),
  image_url: z.string().trim().optional().nullable(),
  points: z.string().optional(),
});

export const optionUpdateSchema = optionCreateSchema.extend({
  id: z.string({ required_error: "ID is required" }).min(1, { message: "ID is required" }),
});
