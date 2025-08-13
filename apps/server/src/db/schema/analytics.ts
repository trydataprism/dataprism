import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  serial,
  bigserial,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { websites } from "./website";

// Enums
export const deviceType = pgEnum("device_type", [
  "DESKTOP",
  "MOBILE",
  "TABLET",
  "TV",
  "UNKNOWN",
]);


// Type definitions for better TypeScript support
export type PageView = typeof pageViews.$inferSelect;
export type NewPageView = typeof pageViews.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type NewUserSession = typeof userSessions.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;

export const eventType = pgEnum("event_type", [
  "CLICK",
  "DOWNLOAD",
  "SIGNUP",
  "LOGIN",
  "LOGOUT",
  "PURCHASE",
  "FORM_SUBMIT",
  "VIDEO_PLAY",
  "SCROLL",
  "CUSTOM",
]);

export const sessionEndReason = pgEnum("session_end_reason", [
  "TIMEOUT",
  "USER_EXIT",
  "PAGE_CLOSE",
  "NEW_SESSION",
  "UNKNOWN",
]);

// Tables
export const pageViews = pgTable(
  "page_views",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    websiteId: text("website_id")
      .notNull()
      .references(() => websites.id, { onDelete: "cascade" }),

    // Visitor tracking
    visitorId: text("visitor_id").notNull(), // Anonymous visitor ID
    sessionId: text("session_id")
      .notNull()
      .references(() => userSessions.id, { onDelete: "cascade" }),

    // Page info
    path: text("path").notNull(),
    title: text("title"),
    hostname: text("hostname").notNull(),
    search: text("search"), // Query parameters
    hash: text("hash"), // URL fragment

    // Referrer data
    referrer: text("referrer"),
    referrerDomain: text("referrer_domain"),

    // UTM tracking
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    utmContent: text("utm_content"),
    utmTerm: text("utm_term"),

    // Device & Browser
    device: deviceType("device"),
    browser: text("browser"),
    browserVersion: text("browser_version"),
    os: text("os"),
    osVersion: text("os_version"),
    userAgent: text("user_agent"),

    // Location
    country: text("country"),
    countryCode: text("country_code"),
    region: text("region"),
    regionCode: text("region_code"),
    city: text("city"),
    timezone: text("timezone"),

    // Screen & Viewport
    screenResolution: text("screen_resolution"),
    viewportSize: text("viewport_size"),

    // Performance
    loadTime: integer("load_time"), // milliseconds

    // Privacy
    ipAddress: text("ip_address"), // Hashed for privacy

    // Timestamps
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("page_views_website_id_idx").on(table.websiteId),
    index("page_views_visitor_id_idx").on(table.visitorId),
    index("page_views_session_id_idx").on(table.sessionId),
    index("page_views_timestamp_idx").on(table.timestamp),
    index("page_views_path_idx").on(table.path),
    index("page_views_referrer_domain_idx").on(table.referrerDomain),
    index("page_views_country_idx").on(table.country),
    index("page_views_device_idx").on(table.device),
    index("page_views_utm_source_idx").on(table.utmSource),
    // Composite indexes for common query patterns
    index("page_views_website_timestamp_idx").on(table.websiteId, table.timestamp),
    index("page_views_website_path_idx").on(table.websiteId, table.path),
    index("page_views_session_timestamp_idx").on(table.sessionId, table.timestamp),
  ]
);

export const userSessions = pgTable(
  "user_sessions",
  {
    id: text("id").primaryKey().notNull(),
    websiteId: text("website_id")
      .notNull()
      .references(() => websites.id, { onDelete: "cascade" }),

    // Visitor tracking
    visitorId: text("visitor_id").notNull(),

    // Session timing
    startTime: timestamp("start_time", { withTimezone: true }).notNull(),
    endTime: timestamp("end_time", { withTimezone: true }),
    duration: integer("duration"), // seconds

    // Session metrics
    pageViews: integer("page_views").default(0).notNull(),
    events: integer("events").default(0).notNull(),
    bounced: boolean("bounced").default(false).notNull(),

    // Entry/Exit pages
    entryPage: text("entry_page").notNull(),
    exitPage: text("exit_page"),

    // Device & Browser (from first page view)
    device: deviceType("device"),
    browser: text("browser"),
    os: text("os"),

    // Location (from first page view)
    country: text("country"),
    region: text("region"),
    city: text("city"),

    // Referrer data (from first page view)
    referrer: text("referrer"),
    referrerDomain: text("referrer_domain"),

    // UTM tracking (from first page view)
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    utmContent: text("utm_content"),
    utmTerm: text("utm_term"),

    // Session end
    endReason: sessionEndReason("end_reason"),

    // Privacy
    ipAddress: text("ip_address"), // Hashed for privacy

    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("user_sessions_website_id_idx").on(table.websiteId),
    index("user_sessions_visitor_id_idx").on(table.visitorId),
    index("user_sessions_start_time_idx").on(table.startTime),
    index("user_sessions_end_time_idx").on(table.endTime),
    index("user_sessions_bounced_idx").on(table.bounced),
    index("user_sessions_country_idx").on(table.country),
    index("user_sessions_device_idx").on(table.device),
    index("user_sessions_referrer_domain_idx").on(table.referrerDomain),
  ]
);

export const events = pgTable(
  "events",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    websiteId: text("website_id")
      .notNull()
      .references(() => websites.id, { onDelete: "cascade" }),

    // Visitor tracking
    visitorId: text("visitor_id").notNull(),
    sessionId: text("session_id")
      .notNull()
      .references(() => userSessions.id, { onDelete: "cascade" }),

    // Event details
    eventType: eventType("event_type").notNull(),
    eventName: text("event_name").notNull(),
    eventCategory: text("event_category"),
    eventLabel: text("event_label"),

    // Page context
    path: text("path").notNull(),
    hostname: text("hostname").notNull(),

    // Event data
    properties: text("properties"), // JSON for custom event properties
    value: decimal("value", { precision: 10, scale: 2 }), // Monetary or numeric value

    // Element details (for click events)
    elementId: text("element_id"),
    elementClass: text("element_class"),
    elementTag: text("element_tag"),
    elementText: text("element_text"),

    // Position data (for scroll, click events)
    xPosition: integer("x_position"),
    yPosition: integer("y_position"),

    // Device context
    device: deviceType("device"),
    browser: text("browser"),
    os: text("os"),

    // Privacy
    ipAddress: text("ip_address"), // Hashed for privacy

    // Timestamps
    timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("events_website_id_idx").on(table.websiteId),
    index("events_visitor_id_idx").on(table.visitorId),
    index("events_session_id_idx").on(table.sessionId),
    index("events_timestamp_idx").on(table.timestamp),
    index("events_event_type_idx").on(table.eventType),
    index("events_event_name_idx").on(table.eventName),
    index("events_path_idx").on(table.path),
    index("events_event_category_idx").on(table.eventCategory),
    // Composite indexes for common query patterns
    index("events_website_timestamp_idx").on(table.websiteId, table.timestamp),
    index("events_website_type_idx").on(table.websiteId, table.eventType),
    index("events_session_timestamp_idx").on(table.sessionId, table.timestamp),
  ]
);
