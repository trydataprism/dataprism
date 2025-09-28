// Environment configuration
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    basePath: process.env.NEXT_PUBLIC_API_BASE_PATH || "/api",
    fullUrl: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}${
      process.env.NEXT_PUBLIC_API_BASE_PATH || "/api"
    }`,
  },
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || "DataPrism",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
  },
} as const;
