import { pgMaterializedView } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { pageViews, events } from "./analytics";

// Daily website statistics materialized view
export const dailyWebsiteStats = pgMaterializedView("daily_website_stats").as((qb) =>
  qb
    .select({
      websiteId: pageViews.websiteId,
      date: sql<string>`DATE(${pageViews.timestamp})`.as("date"),
      pageViews: sql<number>`COUNT(${pageViews.id})`.as("page_views"),
      uniqueVisitors: sql<number>`COUNT(DISTINCT ${pageViews.visitorId})`.as("unique_visitors"),
      sessions: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`.as("sessions"),
    })
    .from(pageViews)
    .groupBy(pageViews.websiteId, sql`DATE(${pageViews.timestamp})`)
);

// Hourly website statistics materialized view
export const hourlyWebsiteStats = pgMaterializedView("hourly_website_stats").as((qb) =>
  qb
    .select({
      websiteId: pageViews.websiteId,
      hour: sql<string>`DATE_TRUNC('hour', ${pageViews.timestamp})`.as("hour"),
      pageViews: sql<number>`COUNT(${pageViews.id})`.as("page_views"),
      uniqueVisitors: sql<number>`COUNT(DISTINCT ${pageViews.visitorId})`.as("unique_visitors"),
      sessions: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`.as("sessions"),
    })
    .from(pageViews)
    .groupBy(pageViews.websiteId, sql`DATE_TRUNC('hour', ${pageViews.timestamp})`)
);

// Popular pages materialized view
export const popularPages = pgMaterializedView("popular_pages").as((qb) =>
  qb
    .select({
      websiteId: pageViews.websiteId,
      path: pageViews.path,
      title: pageViews.title,
      pageViews: sql<number>`COUNT(${pageViews.id})`.as("page_views"),
      uniqueVisitors: sql<number>`COUNT(DISTINCT ${pageViews.visitorId})`.as("unique_visitors"),
      sessions: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`.as("sessions"),
    })
    .from(pageViews)
    .where(sql`${pageViews.timestamp} >= NOW() - INTERVAL '30 days'`)
    .groupBy(pageViews.websiteId, pageViews.path, pageViews.title)
    .orderBy(sql`COUNT(${pageViews.id}) DESC`)
);

// Top referrers materialized view
export const topReferrers = pgMaterializedView("top_referrers").as((qb) =>
  qb
    .select({
      websiteId: pageViews.websiteId,
      referrer: pageViews.referrer,
      pageViews: sql<number>`COUNT(${pageViews.id})`.as("page_views"),
      uniqueVisitors: sql<number>`COUNT(DISTINCT ${pageViews.visitorId})`.as("unique_visitors"),
      sessions: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`.as("sessions"),
    })
    .from(pageViews)
    .where(sql`${pageViews.referrer} IS NOT NULL AND ${pageViews.timestamp} >= NOW() - INTERVAL '30 days'`)
    .groupBy(pageViews.websiteId, pageViews.referrer)
    .orderBy(sql`COUNT(${pageViews.id}) DESC`)
);

// Device and browser statistics materialized view
export const deviceStats = pgMaterializedView("device_stats").as((qb) =>
  qb
    .select({
      websiteId: pageViews.websiteId,
      device: pageViews.device,
      browser: pageViews.browser,
      os: pageViews.os,
      pageViews: sql<number>`COUNT(${pageViews.id})`.as("page_views"),
      uniqueVisitors: sql<number>`COUNT(DISTINCT ${pageViews.visitorId})`.as("unique_visitors"),
      sessions: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`.as("sessions"),
    })
    .from(pageViews)
    .where(sql`${pageViews.timestamp} >= NOW() - INTERVAL '30 days'`)
    .groupBy(pageViews.websiteId, pageViews.device, pageViews.browser, pageViews.os)
);

// Geographic statistics materialized view
export const geoStats = pgMaterializedView("geo_stats").as((qb) =>
  qb
    .select({
      websiteId: pageViews.websiteId,
      country: pageViews.country,
      pageViews: sql<number>`COUNT(${pageViews.id})`.as("page_views"),
      uniqueVisitors: sql<number>`COUNT(DISTINCT ${pageViews.visitorId})`.as("unique_visitors"),
      sessions: sql<number>`COUNT(DISTINCT ${pageViews.sessionId})`.as("sessions"),
    })
    .from(pageViews)
    .where(sql`${pageViews.timestamp} >= NOW() - INTERVAL '30 days'`)
    .groupBy(pageViews.websiteId, pageViews.country)
);

// Event statistics materialized view
export const eventStats = pgMaterializedView("event_stats").as((qb) =>
  qb
    .select({
      websiteId: events.websiteId,
      eventType: events.eventType,
      eventName: events.eventName,
      eventCount: sql<number>`COUNT(${events.id})`.as("event_count"),
      uniqueVisitors: sql<number>`COUNT(DISTINCT ${events.visitorId})`.as("unique_visitors"),
    })
    .from(events)
    .where(sql`${events.timestamp} >= NOW() - INTERVAL '30 days'`)
    .groupBy(events.websiteId, events.eventType, events.eventName)
);

// Export all materialized views
export const materializedViews = {
  dailyWebsiteStats,
  hourlyWebsiteStats,
  popularPages,
  topReferrers,
  deviceStats,
  geoStats,
  eventStats,
} as const;

// Type definitions for materialized views
export type DailyWebsiteStats = typeof dailyWebsiteStats.$inferSelect;
export type HourlyWebsiteStats = typeof hourlyWebsiteStats.$inferSelect;
export type PopularPages = typeof popularPages.$inferSelect;
export type TopReferrers = typeof topReferrers.$inferSelect;
export type DeviceStats = typeof deviceStats.$inferSelect;
export type GeoStats = typeof geoStats.$inferSelect;
export type EventStats = typeof eventStats.$inferSelect;