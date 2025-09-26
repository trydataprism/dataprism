import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// Enums
export const websiteStatus = pgEnum("website_status", [
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED",
  "PENDING_VERIFICATION",
  "DELETED",
]);

export const trackingMode = pgEnum("tracking_mode", [
  "STANDARD",
  "PRIVACY_FOCUSED",
]);

// Tables
export const websites = pgTable(
  "websites",
  {
    id: text("id").primaryKey().notNull(),
    organizationId: text("organization_id").notNull(),
    userId: text("user_id").notNull(),

    // Basic info
    domain: text("domain").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    favicon: text("favicon"),

    // Settings
    timezone: text("timezone").default("UTC").notNull(),
    currency: text("currency").default("USD").notNull(),
    language: text("language").default("en").notNull(),

    // Privacy & Tracking
    isPublic: boolean("is_public").default(false).notNull(),
    trackingMode: trackingMode("tracking_mode").default("STANDARD").notNull(),

    // Tracking identifiers
    trackingId: text("tracking_id").notNull(),
    publicKey: text("public_key").notNull(), // For client-side tracking
    secretKey: text("secret_key").notNull(), // For server-side API

    // Status
    status: websiteStatus("status").default("PENDING_VERIFICATION").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    isVerified: boolean("is_verified").default(false).notNull(),
    verifiedAt: timestamp("verified_at", { mode: "string" }),

    // Analytics settings
    sessionTimeout: integer("session_timeout").default(30).notNull(), // minutes
    bounceRate: integer("bounce_rate").default(0).notNull(), // seconds
    excludeIps: text("exclude_ips").array(), // IP addresses to exclude
    excludePaths: text("exclude_paths").array(), // Paths to exclude
    allowedDomains: text("allowed_domains").array(), // Allowed domains for tracking

    // Filters & Rules
    botFiltering: boolean("bot_filtering").default(true).notNull(),
    spamFiltering: boolean("spam_filtering").default(true).notNull(),

    // Integration settings
    settings: text("settings"), // JSON for additional custom settings
    metadata: text("metadata"), // JSON for metadata

    // Timestamps
    lastEventAt: timestamp("last_event_at", { mode: "string" }),
    createdAt: timestamp("created_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    uniqueIndex("websites_org_domain_unique").on(
      table.organizationId,
      table.domain
    ),
    uniqueIndex("websites_tracking_id_unique").on(table.trackingId),
    uniqueIndex("websites_public_key_unique").on(table.publicKey),
    uniqueIndex("websites_secret_key_unique").on(table.secretKey),
    index("websites_organization_id_idx").on(table.organizationId),
    index("websites_user_id_idx").on(table.userId),
    index("websites_domain_idx").on(table.domain),
    index("websites_status_idx").on(table.status),
    index("websites_is_active_idx").on(table.isActive),
    index("websites_is_verified_idx").on(table.isVerified),
    index("websites_created_at_idx").on(table.createdAt),
  ]
);

export type Website = typeof websites.$inferSelect;
export type NewWebsite = typeof websites.$inferInsert;
