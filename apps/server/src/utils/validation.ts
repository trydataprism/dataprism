import type { z } from "zod";
import type { ValidationError } from "../types";

export function validateRequestBody<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: ValidationError[] } {
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

export function validateRequestParams<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: ValidationError[] } {
  return validateRequestBody(schema, data);
}

export function createValidationResponse(errors: ValidationError[]) {
  return {
    error: "Validation failed",
    details: errors,
  };
}
