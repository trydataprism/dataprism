export const CORS_CONFIG = {
  allowedOrigins: [
    process.env.CORS_ORIGIN || "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173", // Vite default
  ],
  allowedMethods: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
  credentials: true,
  maxAge: 86400,
} as const;