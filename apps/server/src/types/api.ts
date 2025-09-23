import type { Context } from "hono";

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiContext extends Context {
  get: (key: string) => any;
  set: (key: string, value: any) => void;
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
