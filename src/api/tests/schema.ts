import { z } from "zod";

const baseOptionSchema = z.object({
  id: z.string().trim().optional().nullable(),
  label: z.string().trim().optional().nullable(),
  is_correct: z.boolean().nullable(),
  image_url: z.string().trim().optional().nullable(),
  points: z.string().optional(),
});

const optionSchema = baseOptionSchema.refine((val) => val.label?.trim() || val.image_url?.trim(), {
  message: "Option must have label or image",
});

const baseQuestionSchema = z.object({
  id: z.string().trim().optional().nullable(),
  question: z.string().trim().optional().nullable(),
  question_image_url: z.string().trim().optional().nullable(),
  discussion: z.string().trim().optional().nullable(),
  discussion_image_url: z.string().trim().optional().nullable(),
  options: z.array(optionSchema).min(1, { message: "At least one option is required" }),
});

const questionSchema = baseQuestionSchema
  .refine((val) => val.question?.trim() || val.question_image_url?.trim(), {
    message: "Question must have text or image",
  })
  .refine((val) => val.discussion?.trim() || val.discussion_image_url?.trim(), {
    message: "Discussion must have text or image",
  });

export const testCreateSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, {
    message: "Name must be at least 1 character",
  }),
  questions: z
    .array(
      baseQuestionSchema
        .omit({ id: true })
        .refine((val) => val.question?.trim() ?? val.question_image_url?.trim(), {
          message: "Question must have text or image",
        })
        .refine((val) => val.discussion?.trim() ?? val.discussion_image_url?.trim(), {
          message: "Discussion must have text or image",
        }),
    )
    .min(1, { message: "At least one question is required" }),
});

export const testUpdateSchema = z.object({
  id: z.string().trim().optional().nullable(),
  name: z.string({ required_error: "Name is required" }).min(1, {
    message: "Name must be at least 1 character",
  }),
  questions: z.array(questionSchema).min(1, { message: "At least one question is required" }),
});
