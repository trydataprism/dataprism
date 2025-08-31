import type { Context } from "hono";
import type { ApiResponse } from "../types";

export function createSuccessResponse<T>(
  data?: T,
  message?: string
): ApiResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

export function createErrorResponse(
  error: string,
  message?: string
): ApiResponse {
  return {
    success: false,
    error,
    message,
  };
}

export function sendSuccess<T>(
  c: Context,
  data?: T,
  message?: string,
  status = 200 as const
) {
  return c.json(createSuccessResponse(data, message), status);
}

export function sendError(
  c: Context,
  error: string,
  message?: string,
  status?: number
) {
  return c.json(
    createErrorResponse(error, message),
    (status || 400) as 200 | 400 | 500
  );
}

export function sendValidationError(c: Context, errors: unknown) {
  return c.json(
    {
      error: "Validation failed",
      details: errors,
    },
    400
  );
}

export function sendInternalError(c: Context, error?: string) {
  return c.json(
    createErrorResponse(
      "Internal server error",
      process.env.NODE_ENV === "development" ? error : "Something went wrong"
    ),
    500
  );
}
