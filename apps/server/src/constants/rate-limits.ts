export const RATE_LIMITS = {
  AUTH: {
    windowMs: 60 * 1000, // 1 minute
    max: process.env.NODE_ENV === "development" ? 50 : 5,
    message: "Too many authentication attempts, please try again in a minute.",
  },
  PASSWORD_RESET: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 3,
    message: "Too many password reset requests, please try again in 5 minutes.",
  },
  EMAIL_VERIFICATION: {
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 3,
    message: "Too many email verification attempts, please try again in 10 minutes.",
  },
  GENERAL: {
    windowMs: 60 * 1000, // 1 minute
    max: process.env.NODE_ENV === "development" ? 1000 : 100,
    message: "Too many requests, please slow down.",
  },
} as const;