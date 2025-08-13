import { pgTable, text, timestamp, boolean, integer, decimal, serial, pgEnum, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { websites } from "./website";

// Enums
export const errorLevel = pgEnum('error_level', [
  'DEBUG',
  'INFO',
  'WARNING',
  'ERROR',
  'CRITICAL'
]);

export const errorType = pgEnum('error_type', [
  'JAVASCRIPT',
  'NETWORK',
  'CONSOLE',
  'UNHANDLED_REJECTION',
  'RESOURCE_LOAD',
  'PERFORMANCE',
  'CUSTOM'
]);

export const performanceMetricType = pgEnum('performance_metric_type', [
  'PAGE_LOAD',
  'FIRST_CONTENTFUL_PAINT',
  'LARGEST_CONTENTFUL_PAINT',
  'FIRST_INPUT_DELAY',
  'CUMULATIVE_LAYOUT_SHIFT',
  'TIME_TO_INTERACTIVE'
]);

// Tables
export const errorLogs = pgTable('error_logs', {
  id: serial('id').primaryKey(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // Visitor context
  visitorId: text('visitor_id').notNull(),
  sessionId: text('session_id').notNull(),
  
  // Error details
  level: errorLevel('level').notNull(),
  type: errorType('type').notNull(),
  message: text('message').notNull(),
  
  // Stack trace & Source
  stack: text('stack'),
  source: text('source'), // File where error occurred
  lineno: integer('lineno'), // Line number
  colno: integer('colno'), // Column number
  
  // Page context
  path: text('path').notNull(),
  hostname: text('hostname').notNull(),
  userAgent: text('user_agent'),
  
  // Device & Browser
  browser: text('browser'),
  browserVersion: text('browser_version'),
  os: text('os'),
  osVersion: text('os_version'),
  device: text('device'),
  
  // Additional context
  userId: text('user_id'), // If user is logged in
  customData: text('custom_data'), // JSON for additional error context
  tags: text('tags').array(), // Error tags for categorization
  
  // Error frequency tracking
  fingerprint: text('fingerprint').notNull(), // Hash for grouping similar errors
  count: integer('count').default(1).notNull(),
  
  // Resolution tracking
  isResolved: boolean('is_resolved').default(false).notNull(),
  resolvedAt: timestamp('resolved_at', { mode: 'string' }),
  resolvedBy: text('resolved_by'),
  
  // Privacy
  ipAddress: text('ip_address'), // Hashed for privacy
  
  timestamp: timestamp('timestamp', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  index('error_logs_website_id_idx').on(table.websiteId),
  index('error_logs_visitor_id_idx').on(table.visitorId),
  index('error_logs_session_id_idx').on(table.sessionId),
  index('error_logs_timestamp_idx').on(table.timestamp),
  index('error_logs_level_idx').on(table.level),
  index('error_logs_type_idx').on(table.type),
  index('error_logs_fingerprint_idx').on(table.fingerprint),
  index('error_logs_path_idx').on(table.path),
  index('error_logs_is_resolved_idx').on(table.isResolved),
]);

export const realTimeVisitors = pgTable('real_time_visitors', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  // Visitor info
  visitorId: text('visitor_id').notNull(),
  sessionId: text('session_id').notNull(),
  
  // Current activity
  currentPath: text('current_path').notNull(),
  currentTitle: text('current_title'),
  
  // Entry info
  entryPath: text('entry_path').notNull(),
  entryTime: timestamp('entry_time', { mode: 'string' }).notNull(),
  
  // Activity tracking
  lastActivity: timestamp('last_activity', { mode: 'string' }).notNull(),
  pageViews: integer('page_views').default(1).notNull(),
  
  // Device & Location
  device: text('device'),
  browser: text('browser'),
  os: text('os'),
  country: text('country'),
  countryCode: text('country_code'),
  city: text('city'),
  
  // Referrer
  referrer: text('referrer'),
  referrerDomain: text('referrer_domain'),
  
  // UTM parameters
  utmSource: text('utm_source'),
  utmMedium: text('utm_medium'),
  utmCampaign: text('utm_campaign'),
  
  // Status
  isActive: boolean('is_active').default(true).notNull(),
  
  // Performance metrics
  averageLoadTime: integer('average_load_time'), // milliseconds
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(), // Auto-cleanup old entries
}, (table) => [
  uniqueIndex('real_time_visitors_website_visitor_unique').on(table.websiteId, table.visitorId),
  index('real_time_visitors_website_id_idx').on(table.websiteId),
  index('real_time_visitors_session_id_idx').on(table.sessionId),
  index('real_time_visitors_last_activity_idx').on(table.lastActivity),
  index('real_time_visitors_is_active_idx').on(table.isActive),
  index('real_time_visitors_expires_at_idx').on(table.expiresAt),
  index('real_time_visitors_current_path_idx').on(table.currentPath),
  index('real_time_visitors_country_idx').on(table.country),
]);