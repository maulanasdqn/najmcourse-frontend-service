import { z } from "zod";

export const BaseSchema = z.object({
  name: z.string().min(1),
  password: z.string().min(1),
  roleId: z.number(),
});

const UsernameSchema = z.object({
  loginType: z.literal("username"),
  username: z.string().min(1),
});

const EmailSchema = z.object({
  loginType: z.literal("email"),
  email: z.string().email(),
});

export const UserFormSchema = z
  .object({
    loginType: z.enum(["email", "username"]),
  })
  .and(z.discriminatedUnion("loginType", [UsernameSchema, EmailSchema]))
  .and(BaseSchema);

export type UserFormData = z.infer<typeof UserFormSchema>;
