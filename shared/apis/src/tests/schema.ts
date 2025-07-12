import { z } from "zod";

const baseOptionSchema = z.object({
  id: z.string().trim().optional().nullable(),
  label: z.string().trim().optional().nullable(),
  is_correct: z.boolean().nullable(),
  image_url: z.string().trim().optional().nullable(),
  points: z.coerce.number().optional().nullable(),
});

const optionSchema = baseOptionSchema.refine((val) => val.label?.trim() ?? val.image_url?.trim(), {
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

const subTestSchema = z.object({
  id: z.string().trim().optional().nullable(),
  name: z.string({ required_error: "Sub-test name is required" }).min(1, {
    message: "Sub-test name must be at least 1 character",
  }),
  passing_grade: z.coerce.number().min(0, { message: "Passing grade must be at least 0" }),
  banner: z.string().trim().optional().nullable(),
  category: z.string({ required_error: "Category is required" }).min(1, {
    message: "Category must be at least 1 character",
  }),
  questions: z
    .array(
      baseQuestionSchema
        .refine((val) => val.question?.trim() ?? val.question_image_url?.trim(), {
          message: "Question must have text or image",
        })
        .refine((val) => val.discussion?.trim() ?? val.discussion_image_url?.trim(), {
          message: "Discussion must have text or image",
        }),
    )
    .min(1, { message: "At least one question is required" }),
});

export const testCreateSchema = z
  .object({
    name: z.string({ required_error: "Name is required" }).min(1, {
      message: "Name must be at least 1 character",
    }),
    category: z.string({ required_error: "Category is required" }).min(1, {
      message: "Category must be at least 1 character",
    }),
    banner: z.string().trim().optional().nullable(),
    questions: z
      .array(
        baseQuestionSchema
          .refine((val) => val.question?.trim() ?? val.question_image_url?.trim(), {
            message: "Question must have text or image",
          })
          .refine((val) => val.discussion?.trim() ?? val.discussion_image_url?.trim(), {
            message: "Discussion must have text or image",
          }),
      )
      .optional()
      .default([]),
    sub_tests: z.array(subTestSchema).optional(),
  })
  .refine(
    (data) => {
      if (data.category === "Psikologi") {
        return data.sub_tests && data.sub_tests.length > 0;
      } else {
        return data.questions && data.questions.length > 0;
      }
    },
    {
      message:
        "For psychology tests, sub-tests are required. For other categories, main questions are required.",
      path: ["sub_tests"],
    },
  );

export const testUpdateSchema = z.object({
  id: z.string().trim().optional().nullable(),
  name: z.string({ required_error: "Name is required" }).min(1, {
    message: "Name must be at least 1 character",
  }),
  banner: z.string().trim().optional().nullable(),
  category: z.string({ required_error: "Category is required" }).min(1, {
    message: "Category must be at least 1 character",
  }),
  questions: z.array(questionSchema).optional(),
  sub_tests: z.array(subTestSchema).optional(),
});
