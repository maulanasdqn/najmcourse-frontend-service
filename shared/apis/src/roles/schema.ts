import { z } from "zod";

export const roleCreateSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character" }),
  permissions: z
    .array(z.string({ required_error: "Permission ID must be a string" }))
    .min(1, { message: "At least one permission must be selected" }),
});

export const roleUpdateSchema = roleCreateSchema.extend({
  id: z.string({ required_error: "ID is required" }),
});
