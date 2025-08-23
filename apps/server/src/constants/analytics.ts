export const ANALYTICS_CONFIG = {
  REAL_TIME_EXPIRY_MINUTES: 30,
  GEOLOCATION_API_URL: "https://ipapi.co",
  DEFAULT_DEVICE: "UNKNOWN",
  DEFAULT_PATH: "/",
} as const;

export const REFERRER_CATEGORIES = {
  DIRECT: "direct",
  SEARCH: "search",
  SOCIAL: "social",
} as const;

export const EVENT_TYPES = {
  CUSTOM: "CUSTOM",
  CLICK: "CLICK",
  VIEW: "VIEW",
  FORM: "FORM",
} as const;

export const LOG_LEVELS = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
  DEBUG: "DEBUG",
} as const;