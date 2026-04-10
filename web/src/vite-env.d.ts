/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SANITY_API_TOKEN?: string
  readonly VITE_SANITY_DATASET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
