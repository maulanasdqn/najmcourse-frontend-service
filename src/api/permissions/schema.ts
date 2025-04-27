import { z } from "zod";

export const createPermissionSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character" }),
});

export const updatePermissionSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character" }),
});
