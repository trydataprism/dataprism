import type { Context } from "hono";
import {
  validateWebsite,
  getOrCreateSession,
  updateSessionPageViews,
  updateSessionEventCount,
  endSession,
  updateHeartbeat,
  getSession,
  trackPageView,
  trackEvent,
  logError,
  updateReferenceData,
  updateRealTimeVisitor,
  updateVisitorActivity,
  deactivateVisitor,
  getActiveVisitors,
} from "../services";
import {
  trackingDataSchema,
  eventDataSchema,
  sessionEndSchema,
  heartbeatSchema,
  errorDataSchema,
  websiteIdParamSchema,
  sessionQuerySchema,
} from "../validation";
import {
  validateRequestBody,
  validateRequestParams,
  extractClientIP,
  getLocationFromIP,
  sendSuccess,
  sendError,
  sendValidationError,
  sendInternalError,
} from "../utils";

export class TrackingController {

  async trackPageView(c: Context) {
    try {
      const data = await c.req.json();
      
      const validation = validateRequestBody(trackingDataSchema, data);
      if (!validation.success) {
        return sendValidationError(c, validation.errors);
      }

      const validatedData = validation.data;

      // Get origin and IP for validation and geolocation
      const origin = c.req.header("origin") || c.req.header("referer");
      const clientIp = extractClientIP({
        "x-forwarded-for": c.req.header("x-forwarded-for"),
        "x-real-ip": c.req.header("x-real-ip"),
        "cf-connecting-ip": c.req.header("cf-connecting-ip"),
      });

      // Get location data from IP
      const geoData = await getLocationFromIP(clientIp);
      if (geoData) {
        validatedData.country = geoData.country_code;
        validatedData.region = geoData.region;
        validatedData.city = geoData.city;
      }

      // Validate website and domain
      const website = await validateWebsite(validatedData.websiteId, origin);
      if (!website) {
        return sendError(c, "Website not found or domain not allowed", undefined, 404);
      }

      // Ensure session exists
      await getOrCreateSession(
        validatedData.websiteId,
        validatedData.visitorId,
        validatedData.sessionId,
        validatedData
      );

      // Track page view
      await trackPageView(validatedData);

      // Update reference data
      await updateReferenceData(validatedData.websiteId, validatedData);

      // Update real-time visitor tracking
      await updateRealTimeVisitor(
        validatedData.websiteId,
        validatedData.visitorId,
        validatedData.sessionId,
        validatedData
      );

      // Update session page view count
      await updateSessionPageViews(validatedData.sessionId);

      return sendSuccess(c, { success: true });
    } catch (error) {
      console.error("Page view tracking error:", error);
      return sendInternalError(c, error instanceof Error ? error.message : undefined);
    }
  }

  async trackEvent(c: Context) {
    try {
      const data = await c.req.json();
      
      const validation = validateRequestBody(eventDataSchema, data);
      if (!validation.success) {
        return sendValidationError(c, validation.errors);
      }

      const validatedData = validation.data;

      // Validate website
      const website = await validateWebsite(validatedData.websiteId);
      if (!website) {
        return sendError(c, "Website not found or inactive", undefined, 404);
      }

      // Ensure session exists
      await getOrCreateSession(
        validatedData.websiteId,
        validatedData.visitorId,
        validatedData.sessionId,
        validatedData
      );

      // Track event
      await trackEvent(validatedData);

      // Update reference data if new session
      await updateReferenceData(validatedData.websiteId, validatedData);

      // Update real-time visitor tracking
      await updateRealTimeVisitor(
        validatedData.websiteId,
        validatedData.visitorId,
        validatedData.sessionId,
        validatedData
      );

      // Update session event count
      await updateSessionEventCount(validatedData.sessionId);

      return sendSuccess(c, { success: true });
    } catch (error) {
      console.error("Event tracking error:", error);
      return sendInternalError(c, error instanceof Error ? error.message : undefined);
    }
  }

  async endSession(c: Context) {
    try {
      const data = await c.req.json();
      
      const validation = validateRequestBody(sessionEndSchema, data);
      if (!validation.success) {
        return sendValidationError(c, validation.errors);
      }

      const validatedData = validation.data;

      // End session
      await endSession(validatedData.websiteId, validatedData.sessionId);

      // Deactivate real-time visitor
      await deactivateVisitor(validatedData.websiteId, validatedData.sessionId);

      return sendSuccess(c, { success: true });
    } catch (error) {
      console.error("Session end tracking error:", error);
      return sendInternalError(c, error instanceof Error ? error.message : undefined);
    }
  }

  async heartbeat(c: Context) {
    try {
      const data = await c.req.json();
      
      const validation = validateRequestBody(heartbeatSchema, data);
      if (!validation.success) {
        return sendValidationError(c, validation.errors);
      }

      const validatedData = validation.data;

      // Update session heartbeat
      await updateHeartbeat(
        validatedData.websiteId,
        validatedData.sessionId,
        validatedData.path || "/"
      );

      // Update real-time visitor activity
      await updateVisitorActivity(
        validatedData.websiteId,
        validatedData.sessionId,
        validatedData.path,
        validatedData.title
      );

      return sendSuccess(c, { success: true });
    } catch (error) {
      console.error("Heartbeat tracking error:", error);
      return sendInternalError(c, error instanceof Error ? error.message : undefined);
    }
  }

  async logError(c: Context) {
    try {
      const data = await c.req.json();
      
      const validation = validateRequestBody(errorDataSchema, data);
      if (!validation.success) {
        return sendValidationError(c, validation.errors);
      }

      const validatedData = validation.data;

      // Validate website
      const website = await validateWebsite(validatedData.websiteId);
      if (!website) {
        return sendError(c, "Website not found or inactive", undefined, 404);
      }

      // Log error
      await logError(validatedData);

      return sendSuccess(c, { success: true });
    } catch (error) {
      console.error("Error logging error:", error);
      return sendInternalError(c, error instanceof Error ? error.message : undefined);
    }
  }

  async getRealTimeVisitors(c: Context) {
    try {
      const websiteId = c.req.param("websiteId");
      
      const validation = validateRequestParams(websiteIdParamSchema, { websiteId });
      if (!validation.success) {
        return sendValidationError(c, validation.errors);
      }

      // Validate website
      const website = await validateWebsite(validation.data.websiteId);
      if (!website) {
        return sendError(c, "Website not found or inactive", undefined, 404);
      }

      // Get active visitors
      const result = await getActiveVisitors(validation.data.websiteId);

      return sendSuccess(c, {
        visitors: result.visitors,
        count: result.count,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Real-time visitors error:", error);
      return sendInternalError(c, error instanceof Error ? error.message : undefined);
    }
  }

  async getSession(c: Context) {
    try {
      const websiteId = c.req.query("websiteId");
      const sessionId = c.req.query("sessionId");
      
      const validation = validateRequestParams(sessionQuerySchema, { websiteId, sessionId });
      if (!validation.success) {
        return sendValidationError(c, validation.errors);
      }

      const validatedData = validation.data;

      // Validate website
      const website = await validateWebsite(validatedData.websiteId);
      if (!website) {
        return sendError(c, "Website not found or inactive", undefined, 404);
      }

      // Get session info
      const session = await getSession(validatedData.websiteId, validatedData.sessionId);
      
      if (!session) {
        return sendError(c, "Session not found", undefined, 404);
      }

      return sendSuccess(c, {
        session,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Get session error:", error);
      return sendInternalError(c, error instanceof Error ? error.message : undefined);
    }
  }
}