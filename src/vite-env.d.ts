/// <reference types="vite/client" />

// Define the interface for the environment variables
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_AUTH_FUSION_ID: string;
  readonly VITE_AUTH_FUSION_TENANT_ID: string;
  readonly VITE_AUTH_FUSION_ISSUER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
