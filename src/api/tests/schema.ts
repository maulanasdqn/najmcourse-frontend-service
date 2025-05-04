import { z } from "zod";

export const testSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character" }),

  questions: z
    .array(
      z
        .object({
          question: z.string().trim().optional().nullable(),
          question_image_url: z.string().trim().optional().nullable(),
          discussion: z.string().trim().optional().nullable(),
          discussion_image_url: z.string().trim().optional().nullable(),
          options: z
            .array(
              z
                .object({
                  label: z.string().trim().optional().nullable(),
                  is_correct: z.boolean(),
                  image_url: z.string().trim().optional().nullable(),
                  points: z.number().optional(),
                })
                .refine((val) => val.label?.trim() || val.image_url?.trim(), {
                  message: "Option must have label or image",
                }),
            )
            .min(1, { message: "At least one option is required" }),
        })
        .refine((val) => val.question?.trim() || val.question_image_url?.trim(), {
          message: "Question must have text or image",
        })
        .refine((val) => val.discussion?.trim() || val.discussion_image_url?.trim(), {
          message: "Discussion must have text or image",
        }),
    )
    .min(1, { message: "At least one question is required" }),
});
