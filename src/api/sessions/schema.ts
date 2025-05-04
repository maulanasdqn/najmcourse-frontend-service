import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { z } from "zod";
dayjs.extend(isSameOrAfter);

export const sessionSchema = z.object({
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
        .refine(
          (data) => {
            const now = dayjs().tz("Asia/Jakarta");
            const start = dayjs(data.start_date).tz("Asia/Jakarta");

            if (start.isBefore(now, "day")) return false;
            if (start.isSame(now, "day") && start.isBefore(now)) return false;

            return true;
          },
          {
            message: "Start date must not be in the past",
            path: ["start_date"],
          },
        )
        .refine(
          (data) => {
            const start = dayjs(data.start_date).tz("Asia/Jakarta");
            const end = dayjs(data.end_date).tz("Asia/Jakarta");
            return end.isSameOrAfter(start);
          },
          {
            message: "End date must be after start date",
            path: ["end_date"],
          },
        ),
    )
    .min(1, { message: "At least one test must be provided" }),
});
