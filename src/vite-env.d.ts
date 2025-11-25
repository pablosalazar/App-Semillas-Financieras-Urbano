/// <reference types="vite/client" />

// Declare module types for video files
declare module "*.m4v" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}

declare module "*.webm" {
  const src: string;
  export default src;
}
