import type { Context } from "hono";
import { validateWebsite } from "../../modules/website/service";
import {
  getOrCreateSession,
  updateSessionPageViews,
  updateSessionEventCount,
  endSession,
  updateHeartbeat,
  getSession,
} from "../../modules/session/service";
import {
  trackPageView as trackPageViewService,
  trackEvent as trackEventService,
  logError as logErrorService,
  updateReferenceData,
} from "./service";
import {
  updateRealTimeVisitor,
  updateVisitorActivity,
  deactivateVisitor,
  getActiveVisitors,
} from "../../modules/monitoring/service";
import type { z } from "zod";
import {
  trackingDataSchema,
  eventDataSchema,
  sessionEndSchema,
  heartbeatSchema,
  errorDataSchema,
  websiteIdParamSchema,
  sessionQuerySchema,
} from "./validation.js";
import {
  validateRequestBody,
  validateRequestParams,
  extractClientIP,
  getLocationFromIP,
  sendSuccess,
  sendError,
  sendValidationError,
} from "../../utils";

/**
 * Handle page view tracking requests.
 *
 * Validates the payload, enriches it with geolocation using client IP,
 * validates the target website and then records the page view, updates
 * reference aggregates, real-time presence, and session page view counts.
 *
 * @param c Hono request context.
 * @returns JSON response indicating success or validation/error details.
 */
export async function trackPageView(c: Context) {
  /**
   * Handle page view tracking requests.
   *
   * Validates the payload, enriches it with geolocation using client IP,
   * validates the target website and then records the page view, updates
   * reference aggregates, real-time presence, and session page view counts.
   *
   * @param c Hono request context.
   * @returns JSON response indicating success or validation/error details.
   */
  const data = await c.req.json();

  const validation = validateRequestBody(trackingDataSchema, data);
  if (!validation.success) {
    return sendValidationError(c, validation.errors);
  }

  const validatedData = validation.data;

  const origin = c.req.header("origin") || c.req.header("referer");
  const clientIp = extractClientIP({
    "x-forwarded-for": c.req.header("x-forwarded-for"),
    "x-real-ip": c.req.header("x-real-ip"),
    "cf-connecting-ip": c.req.header("cf-connecting-ip"),
  });

  const geoData = await getLocationFromIP(clientIp);
  if (geoData) {
    validatedData.country = geoData.country_code;
    validatedData.region = geoData.region;
    validatedData.city = geoData.city;
  }

  const website = await validateWebsite(validatedData.websiteId, origin);
  if (!website) {
    return sendError(
      c,
      "Website not found or domain not allowed",
      undefined,
      404
    );
  }

  await getOrCreateSession(
    validatedData.websiteId,
    validatedData.visitorId,
    validatedData.sessionId,
    validatedData
  );

  await trackPageViewService(validatedData);
  await updateReferenceData(validatedData.websiteId, validatedData);
  await updateRealTimeVisitor(
    validatedData.websiteId,
    validatedData.visitorId,
    validatedData.sessionId,
    validatedData
  );
  await updateSessionPageViews(validatedData.sessionId);

  return sendSuccess(c, { success: true });
}

/**
 * Handle custom event tracking requests.
 *
 * Validates the payload, ensures target website exists, upserts the session,
 * writes the event, updates reference aggregates and real-time presence, and
 * updates the session's event count.
 *
 * @param c Hono request context.
 * @returns JSON response indicating success or validation/error details.
 */
export async function trackEvent(c: Context) {
  const data = await c.req.json();

  const validation = validateRequestBody(eventDataSchema, data);
  if (!validation.success) {
    return sendValidationError(c, validation.errors);
  }

  const validatedData = validation.data;

  const website = await validateWebsite(validatedData.websiteId);
  if (!website) {
    return sendError(c, "Website not found or inactive", undefined, 404);
  }

  await getOrCreateSession(
    validatedData.websiteId,
    validatedData.visitorId,
    validatedData.sessionId,
    validatedData
  );

  await trackEventService(validatedData);
  await updateReferenceData(validatedData.websiteId, validatedData);
  await updateRealTimeVisitor(
    validatedData.websiteId,
    validatedData.visitorId,
    validatedData.sessionId,
    validatedData
  );
  await updateSessionEventCount(validatedData.sessionId);

  return sendSuccess(c, { success: true });
}

/**
 * Handle session end notifications.
 *
 * Marks the session as ended and deactivates the visitor in real-time
 * presence store.
 *
 * @param c Hono request context.
 * @returns JSON response indicating success or validation/error details.
 */
export async function endSessionHandler(c: Context) {
  const data = await c.req.json();

  const validation = validateRequestBody(sessionEndSchema, data);
  if (!validation.success) {
    return sendValidationError(c, validation.errors);
  }

  const validatedData = validation.data;

  await endSession(validatedData.websiteId, validatedData.sessionId);
  await deactivateVisitor(validatedData.websiteId, validatedData.sessionId);

  return sendSuccess(c, { success: true });
}

/**
 * Handle heartbeat pings to keep a session active and update last-known
 * path and title for the visitor in the real-time presence store.
 *
 * @param c Hono request context.
 * @returns JSON response indicating success or validation/error details.
 */
export async function heartbeat(c: Context) {
  const data = await c.req.json();

  const validation = validateRequestBody(heartbeatSchema, data);
  if (!validation.success) {
    return sendValidationError(c, validation.errors);
  }

  const validatedData = validation.data;

  await updateHeartbeat(
    validatedData.websiteId,
    validatedData.sessionId,
    validatedData.path || "/"
  );

  await updateVisitorActivity(
    validatedData.websiteId,
    validatedData.sessionId,
    validatedData.path,
    validatedData.title
  );

  return sendSuccess(c, { success: true });
}

/**
 * Handle error reports from clients.
 *
 * Validates payload, verifies website, and stores the error log.
 *
 * @param c Hono request context.
 * @returns JSON response indicating success or validation/error details.
 */
export async function logError(c: Context) {
  const data = await c.req.json();

  const validation = validateRequestBody(errorDataSchema, data);
  if (!validation.success) {
    return sendValidationError(c, validation.errors);
  }

  const validatedData = validation.data;

  const website = await validateWebsite(validatedData.websiteId);
  if (!website) {
    return sendError(c, "Website not found or inactive", undefined, 404);
  }

  await logErrorService(validatedData);

  return sendSuccess(c, { success: true });
}

/**
 * List active real-time visitors for a website after pruning expired rows.
 *
 * @param c Hono request context.
 * @returns JSON response with visitors, count and a timestamp.
 */
export async function getRealTimeVisitorsHandler(c: Context) {
  const websiteId = c.req.param("websiteId");

  const validation = validateRequestParams(websiteIdParamSchema, {
    websiteId,
  });
  if (!validation.success) {
    return sendValidationError(c, validation.errors);
  }

  const website = await validateWebsite(validation.data.websiteId);
  if (!website) {
    return sendError(c, "Website not found or inactive", undefined, 404);
  }

  const result = await getActiveVisitors(validation.data.websiteId);

  return sendSuccess(c, {
    visitors: result.visitors,
    count: result.count,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Fetch a single session by `websiteId` and `sessionId` query parameters.
 *
 * @param c Hono request context.
 * @returns JSON response with the session or a 404 error.
 */
export async function getSessionHandler(c: Context) {
  const websiteId = c.req.query("websiteId");
  const sessionId = c.req.query("sessionId");

  const validation = validateRequestParams(sessionQuerySchema, {
    websiteId,
    sessionId,
  });
  if (!validation.success) {
    return sendValidationError(c, validation.errors);
  }

  const validatedData = validation.data;

  const website = await validateWebsite(validatedData.websiteId);
  if (!website) {
    return sendError(c, "Website not found or inactive", undefined, 404);
  }

  const session = await getSession(
    validatedData.websiteId,
    validatedData.sessionId
  );
  if (!session) {
    return sendError(c, "Session not found", undefined, 404);
  }

  return sendSuccess(c, {
    session,
    timestamp: new Date().toISOString(),
  });
}
