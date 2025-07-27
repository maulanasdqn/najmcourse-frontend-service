import { AxiosError } from "axios";
import { TPaginationMeta } from "./pagination";

// Enhanced API types based on OpenAPI schema analysis

export type TAPIVersion = string;

export type TTimestamps = {
  created_at: string;
  updated_at: string;
};

export type TSoftDelete = {
  deleted_at: string | null;
  is_deleted: boolean;
};

export type TBaseEntity = {
  id: string;
} & TTimestamps;

export type TSoftDeleteEntity = TBaseEntity & TSoftDelete;

export type TActivatable = {
  is_active: boolean;
};

export type TPublishable = {
  is_published: boolean;
  published_at: string | null;
};

export type TVersioned = {
  version: number;
  version_notes?: string;
};

// API Response wrappers
export type TSuccessResponse<T = unknown> = {
  success: true;
  data: T;
  message?: string;
  version: TAPIVersion;
};

export type TListResponse<T = unknown> = {
  success: true;
  data: T[];
  meta: TPaginationMeta;
  version: TAPIVersion;
};

export type TErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    field_errors?: Record<string, string[]>;
  };
  version: TAPIVersion;
};

export type TMessageResponse = {
  success: true;
  message: string;
  version: TAPIVersion;
};

// HTTP Status Code types
export type THTTPStatusCode = 
  | 200 // OK
  | 201 // Created
  | 204 // No Content
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 409 // Conflict
  | 422 // Unprocessable Entity
  | 429 // Too Many Requests
  | 500 // Internal Server Error
  | 502 // Bad Gateway
  | 503; // Service Unavailable

// API Error with enhanced type information
export type TAPIError = AxiosError<TErrorResponse> & {
  status?: THTTPStatusCode;
  code?: string;
};

// File upload types
export type TFileUpload = {
  file: File;
  field_name: string;
  max_size?: number;
  allowed_types?: string[];
};

export type TUploadedFile = {
  id: string;
  filename: string;
  original_name: string;
  mime_type: string;
  size: number;
  url: string;
  thumbnail_url?: string;
  created_at: string;
};

export type TUploadResponse = TSuccessResponse<TUploadedFile>;

// Bulk operation types
export type TBulkActionType = "create" | "update" | "delete" | "activate" | "deactivate";

export type TBulkActionRequest<T = unknown> = {
  action: TBulkActionType;
  ids?: string[];
  data?: T;
  filters?: Record<string, unknown>;
};

export type TBulkActionResult = {
  successful: number;
  failed: number;
  errors?: Array<{
    id: string;
    error: string;
  }>;
};

export type TBulkActionResponse = TSuccessResponse<TBulkActionResult>;

// Search and autocomplete types
export type TSearchResult<T = unknown> = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  type: string;
  score: number;
  data: T;
};

export type TSearchResponse<T = unknown> = TSuccessResponse<TSearchResult<T>[]>;

export type TAutocompleteOption = {
  value: string;
  label: string;
  description?: string;
  category?: string;
};

export type TAutocompleteResponse = TSuccessResponse<TAutocompleteOption[]>;

// Health check and system status
export type THealthStatus = "healthy" | "degraded" | "down";

export type THealthCheck = {
  status: THealthStatus;
  version: string;
  timestamp: string;
  services: Record<string, {
    status: THealthStatus;
    response_time?: number;
    error?: string;
  }>;
};

export type TSystemInfo = {
  name: string;
  version: string;
  environment: "development" | "staging" | "production";
  maintenance_mode: boolean;
  features: Record<string, boolean>;
};

// WebSocket types
export type TWebSocketMessage<T = unknown> = {
  type: string;
  data: T;
  timestamp: string;
  id: string;
};

export type TWebSocketEvent = 
  | "user_connected"
  | "user_disconnected" 
  | "test_started"
  | "test_completed"
  | "session_updated"
  | "notification_sent"
  | "achievement_unlocked";

// Rate limiting
export type TRateLimit = {
  limit: number;
  remaining: number;
  reset: number;
  retry_after?: number;
};