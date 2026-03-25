/// <reference types="vite/client" />

// Some linters in this repo may not pick up Vite's built-in `import.meta.env` types.
// Keep a minimal declaration so TypeScript knows `import.meta.env.BASE_URL`.
interface ImportMetaEnv {
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

