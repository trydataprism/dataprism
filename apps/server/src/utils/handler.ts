import type { Context } from "hono";
import { sendInternalError } from "./response";

export type HonoHandler = (c: Context) => Promise<Response> | Response;

/**
 * Wrap a Hono route handler to provide consistent error handling.
 *
 * Any uncaught error thrown by the handler will be logged and a standardized
 * 500 JSON error response will be returned.
 *
 * Example:
 *   tracking.post("/pageview", withErrorHandling((c) => ctrl.trackPageView(c)));
 */
export function withErrorHandling(handler: HonoHandler): HonoHandler {
  return async function wrappedHandler(c: Context) {
    try {
      return await handler(c);
    } catch (error) {
      console.error("Unhandled route error:", error);
      return sendInternalError(
        c,
        error instanceof Error ? error.message : undefined
      );
    }
  };
}
