import { Hono } from "hono";
import { TrackingController } from "../controllers";

const trackingController = new TrackingController();
const tracking = new Hono();

// CORS is handled by global middleware

// Track page view
tracking.post("/pageview", (c) => trackingController.trackPageView(c));

// Track custom event
tracking.post("/event", (c) => trackingController.trackEvent(c));

// Track session end
tracking.post("/session-end", (c) => trackingController.endSession(c));

// Heartbeat to keep session alive
tracking.post("/heartbeat", (c) => trackingController.heartbeat(c));

// Error tracking endpoint
tracking.post("/error", (c) => trackingController.logError(c));

// Real-time visitors endpoint
tracking.get("/realtime/:websiteId", (c) => trackingController.getRealTimeVisitors(c));

// Get session info endpoint
tracking.get("/session", (c) => trackingController.getSession(c));

export { tracking };