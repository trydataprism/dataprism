import { Hono } from "hono";
import { db } from "../db";
import {
  websites,
  pageViews,
  userSessions,
  events,
  realTimeVisitors,
  errorLogs,
  utmCampaigns,
  referrerDomains,
  deviceInfo,
  locationData,
} from "../db/schema";
import { eq, and, count, sql } from "drizzle-orm";

const tracking = new Hono();

// CORS is handled by global middleware

// Helper to validate website exists and domain is allowed
async function validateWebsite(websiteId: string, requestOrigin?: string) {
  const website = await db
    .select()
    .from(websites)
    .where(and(eq(websites.id, websiteId), eq(websites.isActive, true)))
    .limit(1);

  if (!website[0]) {
    return null;
  }

  // Domain validation
  if (requestOrigin) {
    const originDomain = new URL(requestOrigin).hostname;
    const allowedDomains = website[0].allowedDomains || [website[0].domain];

    const isDomainAllowed = allowedDomains.some((domain) => {
      // Exact match or subdomain match
      return originDomain === domain || originDomain.endsWith("." + domain);
    });

    if (!isDomainAllowed) {
      return null;
    }
  }

  return website[0];
}

// Helper to get or create user session
async function getOrCreateSession(
  websiteId: string,
  visitorId: string,
  sessionId: string,
  data: any
) {
  try {
    // Try to find existing session
    const existingSession = await db
      .select()
      .from(userSessions)
      .where(
        and(
          eq(userSessions.id, sessionId),
          eq(userSessions.websiteId, websiteId)
        )
      )
      .limit(1);

    if (existingSession.length > 0) {
      return existingSession[0];
    }

    // Create new session
    const newSession = await db
      .insert(userSessions)
      .values({
        id: sessionId,
        websiteId,
        visitorId,
        startTime: new Date(data.timestamp || Date.now()),
        entryPage: data.path || "/",
        device: data.device || "UNKNOWN",
        browser: data.browser,
        os: data.os,
        country: data.country,
        referrer: data.referrer,
      })
      .returning();

    return newSession[0];
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
}

// Helper to update reference data tables
async function updateReferenceData(websiteId: string, data: any) {
  try {
    // Update UTM campaigns if present
    if (data.utmSource && data.utmMedium && data.utmCampaign) {
      await db
        .insert(utmCampaigns)
        .values({
          id: `${websiteId}-${data.utmSource}-${data.utmMedium}-${data.utmCampaign}`,
          websiteId,
          source: data.utmSource,
          medium: data.utmMedium,
          campaign: data.utmCampaign,
          name: `${data.utmSource} - ${data.utmCampaign}`,
          totalVisitors: 1,
        })
        .onConflictDoUpdate({
          target: [
            utmCampaigns.websiteId,
            utmCampaigns.source,
            utmCampaigns.medium,
            utmCampaigns.campaign,
          ],
          set: {
            totalVisitors: sql`${utmCampaigns.totalVisitors} + 1`,
          },
        });
    }

    // Update referrer domains if present
    if (data.referrerDomain && data.referrerDomain !== data.hostname) {
      let category = "direct";
      if (data.referrerDomain.includes("google")) category = "search";
      else if (
        data.referrerDomain.includes("facebook") ||
        data.referrerDomain.includes("twitter")
      )
        category = "social";

      await db
        .insert(referrerDomains)
        .values({
          id: `${websiteId}-${data.referrerDomain}`,
          websiteId,
          domain: data.referrerDomain,
          category,
          totalReferrals: 1,
        })
        .onConflictDoUpdate({
          target: [referrerDomains.websiteId, referrerDomains.domain],
          set: {
            totalReferrals: sql`${referrerDomains.totalReferrals} + 1`,
          },
        });
    }

    // Update device info
    if (data.browser && data.os) {
      await db
        .insert(deviceInfo)
        .values({
          id: `${websiteId}-${data.browser}-${data.os}`,
          websiteId,
          category: data.device || "UNKNOWN",
          browser: data.browser,
          os: data.os,
          totalSessions: 1,
        })
        .onConflictDoUpdate({
          target: [deviceInfo.websiteId, deviceInfo.browser, deviceInfo.os],
          set: {
            totalSessions: sql`${deviceInfo.totalSessions} + 1`,
          },
        });
    }

    // Update location data if present
    if (data.country) {
      await db
        .insert(locationData)
        .values({
          id: `${websiteId}-${data.country}-${data.region || "unknown"}-${
            data.city || "unknown"
          }`,
          websiteId,
          country: data.country,
          region: data.region,
          city: data.city,
          totalVisitors: 1,
        })
        .onConflictDoUpdate({
          target: [
            locationData.websiteId,
            locationData.country,
            locationData.region,
            locationData.city,
          ],
          set: {
            totalVisitors: sql`${locationData.totalVisitors} + 1`,
          },
        });
    }
  } catch (error) {
    console.error("Error updating reference data:", error);
    // Don't throw here, reference data updates are not critical
  }
}

// Helper to update real-time visitors
async function updateRealTimeVisitor(
  websiteId: string,
  visitorId: string,
  sessionId: string,
  data: any
) {
  try {
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now

    await db
      .insert(realTimeVisitors)
      .values({
        id: `${websiteId}-${visitorId}`,
        websiteId,
        visitorId,
        sessionId,
        currentPath: data.path || "/",
        currentTitle: data.title,
        entryPath: data.path || "/",
        lastActivity: new Date().toISOString(),
        pageViews: 1,
        device: data.device,
        browser: data.browser,
        country: data.country,
        referrer: data.referrer,
        isActive: true,
        expiresAt: expiresAt.toISOString(),
      })
      .onConflictDoUpdate({
        target: [realTimeVisitors.websiteId, realTimeVisitors.visitorId],
        set: {
          currentPath: data.path || "/",
          currentTitle: data.title,
          lastActivity: new Date().toISOString(),
          pageViews: sql`${realTimeVisitors.pageViews} + 1`,
          isActive: true,
          expiresAt: expiresAt.toISOString(),
        },
      });
  } catch (error) {
    console.error("Error updating real-time visitor:", error);
    // Don't throw here, real-time tracking is not critical
  }
}

// Track page view
tracking.post("/pageview", async (c) => {
  try {
    const data = await c.req.json();
    const { websiteId, visitorId, sessionId, timestamp } = data;

    if (!websiteId || !visitorId || !sessionId) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Get origin from headers for domain validation
    const origin = c.req.header("origin") || c.req.header("referer");

    // Get IP for geolocation
    const clientIp =
      c.req.header("x-forwarded-for")?.split(",")[0] ||
      c.req.header("x-real-ip") ||
      c.req.header("cf-connecting-ip") ||
      "unknown";

    // Get location data from IP
    if (
      clientIp !== "unknown" &&
      !clientIp.includes("127.0.0.1") &&
      !clientIp.includes("localhost")
    ) {
      try {
        // Use ipapi.co for geolocation (free, no API key needed)
        const geoResponse = await fetch(`https://ipapi.co/${clientIp}/json/`);
        if (geoResponse.ok) {
          const geoData = await geoResponse.json();
          if (geoData.country_code && geoData.country_code !== "XX") {
            data.country = geoData.country_code;
            data.region = geoData.region;
            data.city = geoData.city;
          }
        }
      } catch (error) {
        console.log("Geolocation API error:", error);
        // Fallback - don't set location data if API fails
      }
    }

    // Validate website and domain
    const website = await validateWebsite(websiteId, origin);
    if (!website) {
      return c.json({ error: "Website not found or domain not allowed" }, 404);
    }

    // Ensure session exists
    await getOrCreateSession(websiteId, visitorId, sessionId, data);

    // Update reference data (UTM, referrers, devices, location)
    await updateReferenceData(websiteId, data);

    // Update real-time visitor tracking
    await updateRealTimeVisitor(websiteId, visitorId, sessionId, data);

    // Insert page view
    await db.insert(pageViews).values({
      websiteId,
      visitorId,
      sessionId,
      path: data.path || "/",
      title: data.title,
      referrer: data.referrer,
      device: data.device || "UNKNOWN",
      browser: data.browser,
      os: data.os,
      country: data.country,
      timestamp: new Date(timestamp || Date.now()),
    });

    // Update session page view count
    const pageViewCount = await db
      .select({ count: count() })
      .from(pageViews)
      .where(eq(pageViews.sessionId, sessionId));

    await db
      .update(userSessions)
      .set({
        pageViews: pageViewCount[0]?.count || 1,
      })
      .where(eq(userSessions.id, sessionId));

    return c.json({ success: true });
  } catch (error) {
    console.error("Page view tracking error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Track custom event
tracking.post("/event", async (c) => {
  try {
    const data = await c.req.json();
    const { websiteId, visitorId, sessionId, timestamp } = data;

    if (!websiteId || !visitorId || !sessionId) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Validate website
    const website = await validateWebsite(websiteId);
    if (!website) {
      return c.json({ error: "Website not found or inactive" }, 404);
    }

    // Ensure session exists
    await getOrCreateSession(websiteId, visitorId, sessionId, data);

    // Update reference data if new session
    await updateReferenceData(websiteId, data);

    // Update real-time visitor tracking
    await updateRealTimeVisitor(websiteId, visitorId, sessionId, data);

    // Insert event
    await db.insert(events).values({
      websiteId,
      visitorId,
      sessionId,
      eventType: data.eventType || "CUSTOM",
      eventName: data.eventName || "custom_event",
      path: data.path || "/",
      properties: data.properties ? JSON.stringify(data.properties) : null,
      timestamp: new Date(timestamp || Date.now()),
    });

    // Update session event count
    const eventCount = await db
      .select({ count: count() })
      .from(events)
      .where(eq(events.sessionId, sessionId));

    // Update session
    await db
      .update(userSessions)
      .set({
        pageViews: eventCount[0]?.count || 1,
      })
      .where(eq(userSessions.id, sessionId));

    return c.json({ success: true });
  } catch (error) {
    console.error("Event tracking error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Track session end
tracking.post("/session-end", async (c) => {
  try {
    const data = await c.req.json();
    const { websiteId, sessionId, duration, endReason } = data;

    if (!websiteId || !sessionId) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Update session end time
    await db
      .update(userSessions)
      .set({
        endTime: new Date(),
      })
      .where(
        and(
          eq(userSessions.id, sessionId),
          eq(userSessions.websiteId, websiteId)
        )
      );

    // Mark real-time visitor as inactive
    await db
      .update(realTimeVisitors)
      .set({
        isActive: false,
        lastActivity: new Date().toISOString(),
      })
      .where(
        and(
          eq(realTimeVisitors.websiteId, websiteId),
          eq(realTimeVisitors.sessionId, sessionId)
        )
      );

    return c.json({ success: true });
  } catch (error) {
    console.error("Session end tracking error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Heartbeat to keep session alive
tracking.post("/heartbeat", async (c) => {
  try {
    const data = await c.req.json();
    const { websiteId, sessionId } = data;

    if (!websiteId || !sessionId) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Update session last activity
    await db
      .update(userSessions)
      .set({
        exitPage: data.path || "/",
      })
      .where(
        and(
          eq(userSessions.id, sessionId),
          eq(userSessions.websiteId, websiteId)
        )
      );

    // Update real-time visitor activity
    await db
      .update(realTimeVisitors)
      .set({
        currentPath: data.path || "/",
        currentTitle: data.title,
        lastActivity: new Date().toISOString(),
        isActive: true,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // Extend expiry
      })
      .where(
        and(
          eq(realTimeVisitors.websiteId, websiteId),
          eq(realTimeVisitors.sessionId, sessionId)
        )
      );

    return c.json({ success: true });
  } catch (error) {
    console.error("Heartbeat tracking error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Error tracking endpoint
tracking.post("/error", async (c) => {
  try {
    const data = await c.req.json();
    const { websiteId, visitorId, sessionId } = data;

    if (!websiteId) {
      return c.json({ error: "Missing website ID" }, 400);
    }

    // Validate website
    const website = await validateWebsite(websiteId);
    if (!website) {
      return c.json({ error: "Website not found or inactive" }, 404);
    }

    // Log error to database
    await db.insert(errorLogs).values({
      websiteId,
      visitorId: visitorId || "unknown",
      sessionId: sessionId || "unknown",
      level: data.level || "ERROR",
      source: data.source || "client",
      message: data.message || "Unknown error",
      path: data.path || data.context || "/",
      browser: data.browser,
      os: data.os,
      timestamp: data.timestamp
        ? new Date(data.timestamp).toISOString()
        : new Date().toISOString(),
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("Error logging error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Real-time visitors endpoint
tracking.get("/realtime/:websiteId", async (c) => {
  try {
    const websiteId = c.req.param("websiteId");

    if (!websiteId) {
      return c.json({ error: "Missing website ID" }, 400);
    }

    // Validate website
    const website = await validateWebsite(websiteId);
    if (!website) {
      return c.json({ error: "Website not found or inactive" }, 404);
    }

    // Clean up expired visitors
    await db
      .delete(realTimeVisitors)
      .where(
        and(
          eq(realTimeVisitors.websiteId, websiteId),
          sql`${realTimeVisitors.expiresAt} < NOW()`
        )
      );

    // Get active visitors
    const activeVisitors = await db
      .select()
      .from(realTimeVisitors)
      .where(
        and(
          eq(realTimeVisitors.websiteId, websiteId),
          eq(realTimeVisitors.isActive, true)
        )
      )
      .orderBy(sql`${realTimeVisitors.lastActivity} DESC`);

    return c.json({
      visitors: activeVisitors,
      count: activeVisitors.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Real-time visitors error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get session info endpoint
tracking.get("/session", async (c) => {
  try {
    const websiteId = c.req.query("websiteId");
    const sessionId = c.req.query("sessionId");

    if (!websiteId || !sessionId) {
      return c.json({ error: "Missing websiteId or sessionId" }, 400);
    }

    // Validate website
    const website = await validateWebsite(websiteId);
    if (!website) {
      return c.json({ error: "Website not found or inactive" }, 404);
    }

    // Get session info
    const session = await db
      .select()
      .from(userSessions)
      .where(
        and(
          eq(userSessions.id, sessionId),
          eq(userSessions.websiteId, websiteId)
        )
      )
      .limit(1);

    if (session.length === 0) {
      return c.json({ error: "Session not found" }, 404);
    }

    return c.json({
      session: session[0],
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Get session error:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

export { tracking };
