import { z } from "zod";

export const testSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character" }),

  questions: z
    .array(
      z
        .object({
          question: z.string().optional(),
          question_image_url: z.string().optional(),
          discussion: z.string().optional(),
          discussion_image_url: z.string().optional(),
          options: z
            .array(
              z
                .object({
                  label: z.string().optional(),
                  is_correct: z.boolean(),
                  image_url: z.string().optional(),
                  points: z.number().optional(),
                })
                .refine((val) => val.label ?? val.image_url, {
                  message: "Option must have label or image",
                }),
            )
            .min(1, { message: "At least one option is required" }),
        })
        .refine((val) => val.question ?? val.question_image_url, {
          message: "Question must have text or image",
        })
        .refine((val) => val.discussion ?? val.discussion_image_url, {
          message: "Discussion must have text or image",
        }),
    )
    .min(1, { message: "At least one question is required" }),
});
