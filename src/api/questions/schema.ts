import { z } from "zod";

export const questionCreateSchema = z.object({
  question: z.string().trim().optional().nullable(),
  question_image_url: z.string().trim().optional().nullable(),
  discussion: z.string().trim().optional().nullable(),
  discussion_image_url: z.string().trim().optional().nullable(),
  option_ids: z
    .array(z.string({ required_error: "Option ID must be a string" }))
    .min(1, { message: "At least one option must be selected" }),
});

export const questionUpdateSchema = questionCreateSchema.extend({
  id: z
    .string({ required_error: "ID is required" })
    .min(1, { message: "ID must be at least 1 character" }),
});
