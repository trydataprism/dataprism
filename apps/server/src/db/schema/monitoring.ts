import { pgTable, text, timestamp, boolean, integer, serial, pgEnum, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { websites } from "./website";

export const errorLevel = pgEnum('error_level', [
  'ERROR',
  'WARNING',
  'INFO'
]);

export const errorLogs = pgTable('error_logs', {
  id: serial('id').primaryKey(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  visitorId: text('visitor_id').notNull(),
  sessionId: text('session_id').notNull(),
  
  level: errorLevel('level').notNull(),
  message: text('message').notNull(),
  source: text('source'),
  path: text('path').notNull(),
  
  browser: text('browser'),
  os: text('os'),
  
  timestamp: timestamp('timestamp', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  index('error_logs_website_id_idx').on(table.websiteId),
  index('error_logs_timestamp_idx').on(table.timestamp),
  index('error_logs_level_idx').on(table.level),
]);

export const realTimeVisitors = pgTable('real_time_visitors', {
  id: text('id').primaryKey().notNull(),
  websiteId: text('website_id')
    .notNull()
    .references(() => websites.id, { onDelete: 'cascade' }),
  
  visitorId: text('visitor_id').notNull(),
  sessionId: text('session_id').notNull(),
  
  currentPath: text('current_path').notNull(),
  currentTitle: text('current_title'),
  
  entryPath: text('entry_path').notNull(),
  lastActivity: timestamp('last_activity', { mode: 'string' }).notNull(),
  pageViews: integer('page_views').default(1).notNull(),
  
  device: text('device'),
  browser: text('browser'),
  country: text('country'),
  referrer: text('referrer'),
  
  isActive: boolean('is_active').default(true).notNull(),
  expiresAt: timestamp('expires_at', { mode: 'string' }).notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('real_time_visitors_website_visitor_unique').on(table.websiteId, table.visitorId),
  index('real_time_visitors_website_id_idx').on(table.websiteId),
  index('real_time_visitors_last_activity_idx').on(table.lastActivity),
  index('real_time_visitors_is_active_idx').on(table.isActive),
  index('real_time_visitors_current_path_idx').on(table.currentPath),
]);

export type ErrorLog = typeof errorLogs.$inferSelect;
export type NewErrorLog = typeof errorLogs.$inferInsert;
export type RealTimeVisitor = typeof realTimeVisitors.$inferSelect;
export type NewRealTimeVisitor = typeof realTimeVisitors.$inferInsert;