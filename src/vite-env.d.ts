/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
// readonly VITE_JWT_SECRET?: string; // si lo necesitas en frontend, normalmente NO
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
