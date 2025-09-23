import type { Context } from "hono";
import type { z } from "zod";
import type { ValidationError } from "../types";

export function validateRequestBody<S extends z.ZodTypeAny>(
  schema: S,
  data: unknown
): { success: true; data: z.infer<S> } | { success: false; errors: ValidationError[] } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  const errors: ValidationError[] = result.error.issues.map((error) => ({
    field: error.path.join("."),
    message: error.message,
    code: error.code,
  }));

  return { success: false, errors };
}

export function validateRequestParams<S extends z.ZodTypeAny>(
  schema: S,
  data: unknown
): { success: true; data: z.infer<S> } | { success: false; errors: ValidationError[] } {
  return validateRequestBody(schema, data);
}

export function createValidationResponse(errors: ValidationError[]) {
  return {
    error: "Validation failed",
    details: errors,
  };
}