import { z } from "zod";

export const permissionCreateSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character" }),
});

export const permissionUpdateSchema = permissionCreateSchema.extend({
  id: z
    .string({ required_error: "ID is required" })
    .min(1, { message: "ID must be at least 1 character" }),
});
