import { z } from "zod";

export const createQuestionSchema = z.object({
  label: z
    .string({ required_error: "Label is required" })
    .min(1, { message: "Label must be at least 1 character" }),
  option_ids: z
    .array(z.string({ required_error: "Option ID must be a string" }))
    .min(1, { message: "At least one option must be selected" }),
});

export const updateQuestionSchema = z.object({
  id: z.string({ required_error: "ID is required" }),
  label: z
    .string({ required_error: "Label is required" })
    .min(1, { message: "Label must be at least 1 character" }),
  option_ids: z
    .array(z.string({ required_error: "Option ID must be a string" }))
    .min(1, { message: "At least one option must be selected" }),
});
