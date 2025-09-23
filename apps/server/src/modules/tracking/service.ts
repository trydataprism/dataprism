import { db } from "../../db";
import {
  pageViews,
  events,
  utmCampaigns,
  referrerDomains,
  deviceInfo,
  locationData,
  errorLogs,
} from "../../db/schema";
import { sql } from "drizzle-orm";
import { ANALYTICS_CONFIG } from "../../config/analytics";
import { categorizeReferrer } from "../../utils";
import type { TrackingData, EventData, ErrorData } from "../../types";

export async function trackPageView(data: TrackingData): Promise<void> {
  /**
   * Persist a page view event for analytics.
   *
   * The path is normalized to a default when missing. Timestamps default to now
   * when not provided by the client.
   *
   * @param data The tracking payload describing the page view.
   * @returns Resolves when the row has been inserted.
   */
  await db.insert(pageViews).values({
    websiteId: data.websiteId,
    visitorId: data.visitorId,
    sessionId: data.sessionId,
    path: data.path || ANALYTICS_CONFIG.DEFAULT_PATH,
    title: data.title,
    referrer: data.referrer,
    device:
      (data.device as "DESKTOP" | "MOBILE" | "TABLET" | "UNKNOWN") || "UNKNOWN",
    browser: data.browser,
    os: data.os,
    country: data.country,
    timestamp: new Date(data.timestamp || Date.now()),
  });
}

export async function trackEvent(data: EventData): Promise<void> {
  /**
   * Persist a custom event for analytics.
   *
   * Defaults `eventType` to `CUSTOM` and `eventName` to `custom_event` when not
   * specified.
   *
   * @param data The event payload including metadata and optional properties.
   * @returns Resolves when the row has been inserted.
   */
  await db.insert(events).values({
    websiteId: data.websiteId,
    visitorId: data.visitorId,
    sessionId: data.sessionId,
    eventType:
      (data.eventType as "CLICK" | "FORM_SUBMIT" | "CUSTOM") || "CUSTOM",
    eventName: data.eventName || "custom_event",
    path: data.path || ANALYTICS_CONFIG.DEFAULT_PATH,
    properties: data.properties ? JSON.stringify(data.properties) : null,
    timestamp: new Date(data.timestamp || Date.now()),
  });
}

export async function logError(data: ErrorData): Promise<void> {
  /**
   * Record an error log entry originating from client or server contexts.
   *
   * Defaults missing identifiers to "unknown" and fills timestamp with current
   * time when not provided.
   *
   * @param data Error data including message, level, source, and context.
   * @returns Resolves when the row has been inserted.
   */
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

export async function updateReferenceData(
  websiteId: string,
  data: TrackingData
): Promise<void> {
  /**
   * Update denormalized reference tables for UTM, referrer domain, device and
   * location aggregates. Each table uses upsert semantics to increment counters.
   *
   * @param websiteId The website identifier used to scope aggregates.
   * @param data Tracking payload used to derive aggregate keys and counters.
   * @returns Resolves after all relevant aggregates are updated.
   */
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

  if (data.browser && data.os) {
    await db
      .insert(deviceInfo)
      .values({
        id: `${websiteId}-${data.browser}-${data.os}`,
        websiteId,
        category:
          (data.device as "DESKTOP" | "MOBILE" | "TABLET" | "UNKNOWN") ||
          "UNKNOWN",
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
}
