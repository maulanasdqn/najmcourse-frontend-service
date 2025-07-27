import { z } from "zod";

// Common validation patterns and utilities

// String validation patterns
export const emailSchema = z.string().email("Invalid email format");
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format");
export const urlSchema = z.string().url("Invalid URL format");
export const uuidSchema = z.string().uuid("Invalid UUID format");
export const slugSchema = z.string().regex(/^[a-z0-9-]+$/, "Invalid slug format");

// Password validation
export const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");

export const confirmPasswordSchema = (passwordField: string) => 
  z.string().refine((val, ctx) => {
    const password = ctx.parent?.[passwordField];
    return val === password;
  }, "Passwords do not match");

// Numeric validations
export const positiveIntSchema = z.number().int().positive("Must be a positive integer");
export const nonNegativeIntSchema = z.number().int().min(0, "Must be non-negative");
export const percentageSchema = z.number().min(0).max(100, "Must be between 0 and 100");
export const ratingSchema = z.number().min(1).max(5, "Rating must be between 1 and 5");

// Text validation
export const nonEmptyStringSchema = z.string().min(1, "This field is required");
export const nameSchema = z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be less than 50 characters");
export const descriptionSchema = z.string().max(1000, "Description must be less than 1000 characters");
export const titleSchema = z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters");

// File validation
export const fileTypeSchema = (allowedTypes: string[]) => 
  z.instanceof(File).refine(
    (file) => allowedTypes.includes(file.type),
    `File type must be one of: ${allowedTypes.join(", ")}`
  );

export const fileSizeSchema = (maxSizeInMB: number) =>
  z.instanceof(File).refine(
    (file) => file.size <= maxSizeInMB * 1024 * 1024,
    `File size must be less than ${maxSizeInMB}MB`
  );

export const imageFileSchema = fileTypeSchema(["image/jpeg", "image/png", "image/gif", "image/webp"]);
export const documentFileSchema = fileTypeSchema(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);

// Date validation
export const futureDateSchema = z.string().refine(
  (date) => new Date(date) > new Date(),
  "Date must be in the future"
);

export const pastDateSchema = z.string().refine(
  (date) => new Date(date) < new Date(),
  "Date must be in the past"
);

export const birthDateSchema = z.string().refine(
  (date) => {
    const birthDate = new Date(date);
    const now = new Date();
    const age = now.getFullYear() - birthDate.getFullYear();
    return age >= 13 && age <= 120;
  },
  "Age must be between 13 and 120 years"
);

// Array validation
export const nonEmptyArraySchema = <T>(schema: z.ZodSchema<T>) =>
  z.array(schema).min(1, "At least one item is required");

export const uniqueArraySchema = <T>(schema: z.ZodSchema<T>) =>
  z.array(schema).refine(
    (arr) => new Set(arr).size === arr.length,
    "Array items must be unique"
  );

// Custom field validation
export const identityNumberSchema = z.string().regex(
  /^\d{16}$/,
  "Identity number must be exactly 16 digits"
);

export const referralCodeSchema = z.string().regex(
  /^[A-Z0-9]{6,8}$/,
  "Referral code must be 6-8 uppercase letters and numbers"
);

export const studentIdSchema = z.string().regex(
  /^STD\d{6}$/,
  "Student ID must be in format STD followed by 6 digits"
);

// Complex validation schemas
export const userRegistrationSchema = z.object({
  fullname: nameSchema,
  email: emailSchema,
  phone_number: phoneSchema,
  password: passwordSchema,
  confirm_password: z.string(),
  student_type: z.enum(["regular", "premium", "vip"]),
  referral_code: referralCodeSchema.optional(),
  terms_accepted: z.boolean().refine(val => val === true, "Terms must be accepted")
}).refine(data => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"]
});

export const profileUpdateSchema = z.object({
  fullname: nameSchema,
  phone_number: phoneSchema,
  identity_number: identityNumberSchema.optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  religion: z.enum(["islam", "christian", "other"]).optional(),
  birthdate: birthDateSchema.optional(),
  avatar: imageFileSchema.optional()
});

export const testCreationSchema = z.object({
  title: titleSchema,
  description: descriptionSchema,
  category: nonEmptyStringSchema,
  duration: positiveIntSchema,
  total_questions: positiveIntSchema,
  passing_score: percentageSchema,
  difficulty: z.enum(["easy", "medium", "hard"]),
  is_randomized: z.boolean(),
  instructions: descriptionSchema.optional()
});

// Form validation utilities
export type TValidationError = {
  field: string;
  message: string;
};

export type TValidationResult<T> = {
  success: boolean;
  data?: T;
  errors?: TValidationError[];
};

export const validateWithSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): TValidationResult<T> => {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: TValidationError[] = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }));
      return { success: false, errors: validationErrors };
    }
    return { 
      success: false, 
      errors: [{ field: 'general', message: 'Validation failed' }] 
    };
  }
};

// Type guards
export const isValidEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};

export const isValidPhone = (phone: string): boolean => {
  return phoneSchema.safeParse(phone).success;
};

export const isValidUUID = (id: string): boolean => {
  return uuidSchema.safeParse(id).success;
};

export const isValidUrl = (url: string): boolean => {
  return urlSchema.safeParse(url).success;
};

// Type inference from schemas
export type TUserRegistrationRequest = z.infer<typeof userRegistrationSchema>;
export type TProfileUpdateRequest = z.infer<typeof profileUpdateSchema>;
export type TTestCreationRequest = z.infer<typeof testCreationSchema>;