import type { Context } from "hono";

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiContext extends Context {
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
}

export interface RequestHeaders {
  origin?: string;
  referer?: string;
  "user-agent"?: string;
  "x-forwarded-for"?: string;
  "x-real-ip"?: string;
  "cf-connecting-ip"?: string;
  authorization?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}
