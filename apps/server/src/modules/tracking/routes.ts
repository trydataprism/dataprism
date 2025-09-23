import { Hono } from "hono";
import {
  trackPageView,
  trackEvent,
  endSessionHandler,
  heartbeat,
  logError,
  getRealTimeVisitorsHandler,
  getSessionHandler,
} from "./controller";
import { withErrorHandling } from "../../utils";

const tracking = new Hono();

/**
 * Track page view.
 */
tracking.post(
  "/pageview",
  withErrorHandling((c) => trackPageView(c))
);

/**
 * Track custom event.
 */
tracking.post(
  "/event",
  withErrorHandling((c) => trackEvent(c))
);

/**
 * Track session end.
 */
tracking.post(
  "/session-end",
  withErrorHandling((c) => endSessionHandler(c))
);

/**
 * Heartbeat to keep session alive.
 */
tracking.post(
  "/heartbeat",
  withErrorHandling((c) => heartbeat(c))
);

/**
 * Error tracking endpoint.
 */
tracking.post(
  "/error",
  withErrorHandling((c) => logError(c))
);

/**
 * Real-time visitors endpoint.
 */
tracking.get(
  "/realtime/:websiteId",
  withErrorHandling((c) => getRealTimeVisitorsHandler(c))
);

/**
 * Get session info endpoint.
 */
tracking.get(
  "/session",
  withErrorHandling((c) => getSessionHandler(c))
);

export { tracking };
