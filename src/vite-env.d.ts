/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOW_ADS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
