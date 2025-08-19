import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  bigserial,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { websites } from "./website";

export const deviceType = pgEnum("device_type", [
  "DESKTOP",
  "MOBILE",
  "TABLET",
  "UNKNOWN",
]);

export const eventType = pgEnum("event_type", [
  "CLICK",
  "FORM_SUBMIT",
  "CUSTOM",
]);

export const pageViews = pgTable(
  "page_views",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    websiteId: text("website_id")
      .notNull()
      .references(() => websites.id, { onDelete: "cascade" }),

    visitorId: text("visitor_id").notNull(),
    sessionId: text("session_id")
      .notNull()
      .references(() => userSessions.id, { onDelete: "cascade" }),

    path: text("path").notNull(),
    title: text("title"),
    referrer: text("referrer"),

    device: deviceType("device"),
    browser: text("browser"),
    os: text("os"),
    country: text("country"),

    timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("page_views_website_id_idx").on(table.websiteId),
    index("page_views_timestamp_idx").on(table.timestamp),
    index("page_views_website_timestamp_idx").on(
      table.websiteId,
      table.timestamp
    ),
  ]
);

export const userSessions = pgTable(
  "user_sessions",
  {
    id: text("id").primaryKey().notNull(),
    websiteId: text("website_id")
      .notNull()
      .references(() => websites.id, { onDelete: "cascade" }),

    visitorId: text("visitor_id").notNull(),

    startTime: timestamp("start_time", { withTimezone: true }).notNull(),
    endTime: timestamp("end_time", { withTimezone: true }),

    pageViews: integer("page_views").default(0).notNull(),
    bounced: boolean("bounced").default(false).notNull(),

    entryPage: text("entry_page").notNull(),
    exitPage: text("exit_page"),

    device: deviceType("device"),
    browser: text("browser"),
    os: text("os"),
    country: text("country"),
    referrer: text("referrer"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("user_sessions_website_id_idx").on(table.websiteId),
    index("user_sessions_start_time_idx").on(table.startTime),
  ]
);

export const events = pgTable(
  "events",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    websiteId: text("website_id")
      .notNull()
      .references(() => websites.id, { onDelete: "cascade" }),

    visitorId: text("visitor_id").notNull(),
    sessionId: text("session_id")
      .notNull()
      .references(() => userSessions.id, { onDelete: "cascade" }),

    eventType: eventType("event_type").notNull(),
    eventName: text("event_name").notNull(),

    path: text("path").notNull(),
    properties: text("properties"),

    timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index("events_website_id_idx").on(table.websiteId),
    index("events_timestamp_idx").on(table.timestamp),
    index("events_website_timestamp_idx").on(table.websiteId, table.timestamp),
  ]
);

export type PageView = typeof pageViews.$inferSelect;
export type NewPageView = typeof pageViews.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type NewUserSession = typeof userSessions.$inferInsert;
export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
