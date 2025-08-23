import { db } from "../db";
import {
  pageViews,
  events,
  utmCampaigns,
  referrerDomains,
  deviceInfo,
  locationData,
  errorLogs,
} from "../db/schema";
import { sql } from "drizzle-orm";
import { ANALYTICS_CONFIG } from "../constants";
import { categorizeReferrer } from "../utils";
import type { TrackingData, EventData, ErrorData } from "../types";

export class AnalyticsService {
  async trackPageView(data: TrackingData): Promise<void> {
    await db.insert(pageViews).values({
      websiteId: data.websiteId,
      visitorId: data.visitorId,
      sessionId: data.sessionId,
      path: data.path || ANALYTICS_CONFIG.DEFAULT_PATH,
      title: data.title,
      referrer: data.referrer,
      device: (data.device as "DESKTOP" | "MOBILE" | "TABLET" | "UNKNOWN") || "UNKNOWN",
      browser: data.browser,
      os: data.os,
      country: data.country,
      timestamp: new Date(data.timestamp || Date.now()),
    });
  }

  async trackEvent(data: EventData): Promise<void> {
    await db.insert(events).values({
      websiteId: data.websiteId,
      visitorId: data.visitorId,
      sessionId: data.sessionId,
      eventType: (data.eventType as "CLICK" | "FORM_SUBMIT" | "CUSTOM") || "CUSTOM",
      eventName: data.eventName || "custom_event",
      path: data.path || ANALYTICS_CONFIG.DEFAULT_PATH,
      properties: data.properties ? JSON.stringify(data.properties) : null,
      timestamp: new Date(data.timestamp || Date.now()),
    });
  }

  async logError(data: ErrorData): Promise<void> {
    await db.insert(errorLogs).values({
      websiteId: data.websiteId,
      visitorId: data.visitorId || "unknown",
      sessionId: data.sessionId || "unknown",
      level: (data.level as "ERROR" | "WARNING" | "INFO") || "ERROR",
      source: data.source || "client",
      message: data.message || "Unknown error",
      path: data.path || data.context || ANALYTICS_CONFIG.DEFAULT_PATH,
      browser: data.browser,
      os: data.os,
      timestamp: data.timestamp
        ? new Date(data.timestamp).toISOString()
        : new Date().toISOString(),
    });
  }

  async updateReferenceData(websiteId: string, data: TrackingData): Promise<void> {
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
        const category = categorizeReferrer(data.referrerDomain);

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
            category: (data.device as "DESKTOP" | "MOBILE" | "TABLET" | "UNKNOWN") || "UNKNOWN",
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
}