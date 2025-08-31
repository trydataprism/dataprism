export const CORS_CONFIG = {
  allowedOrigins: [
    process.env.CORS_ORIGIN || "http://localhost:3001",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173", // Vite default
    "http://localhost:3002", // Additional dev port
    "http://localhost:3003", // Additional dev port
  ],
  allowedMethods: "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  allowedHeaders:
    "Content-Type, Authorization, X-Requested-With, X-CSRF-Token, Origin, Accept, Cache-Control, X-Requested-With",
  credentials: true,
  maxAge: 86400,
} as const;
