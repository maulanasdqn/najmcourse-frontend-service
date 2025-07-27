import { z } from "zod";

// Enhanced pagination types based on OpenAPI schema analysis

export type TSortDirection = "asc" | "desc";

export type TPaginationParams = {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_direction?: TSortDirection;
};

export type TFilterParams = {
  search?: string;
  status?: string;
  category?: string;
  type?: string;
  date_from?: string;
  date_to?: string;
  [key: string]: string | number | boolean | undefined;
};

export type TListParams = TPaginationParams & TFilterParams;

export type TPaginationMeta = {
  current_page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next_page: boolean;
  has_previous_page: boolean;
  next_page: number | null;
  previous_page: number | null;
};

export type TAdvancedFilter = {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "like" | "in" | "between";
  value: string | number | boolean | (string | number)[];
};

export type TAdvancedFilterParams = TPaginationParams & {
  filters?: TAdvancedFilter[];
  search_fields?: string[];
  include_inactive?: boolean;
  include_deleted?: boolean;
};

// Zod schemas for validation
export const sortDirectionSchema = z.enum(["asc", "desc"]);

export const paginationParamsSchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
  sort_by: z.string().optional(),
  sort_direction: sortDirectionSchema.optional()
});

export const filterParamsSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
  category: z.string().optional(),
  type: z.string().optional(),
  date_from: z.string().datetime().optional(),
  date_to: z.string().datetime().optional()
}).catchall(z.union([z.string(), z.number(), z.boolean()]).optional());

export const listParamsSchema = paginationParamsSchema.merge(filterParamsSchema);

export const advancedFilterSchema = z.object({
  field: z.string(),
  operator: z.enum(["eq", "ne", "gt", "gte", "lt", "lte", "like", "in", "between"]),
  value: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.array(z.union([z.string(), z.number()]))
  ])
});

export const advancedFilterParamsSchema = paginationParamsSchema.extend({
  filters: z.array(advancedFilterSchema).optional(),
  search_fields: z.array(z.string()).optional(),
  include_inactive: z.boolean().optional(),
  include_deleted: z.boolean().optional()
});

// Type inference from schemas
export type TListParamsRequest = z.infer<typeof listParamsSchema>;
export type TAdvancedFilterRequest = z.infer<typeof advancedFilterParamsSchema>;